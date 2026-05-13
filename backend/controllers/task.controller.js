const TaskModel = require('../models/task.model');
const BoardModel = require('../models/board.model');
const SubTaskModel = require('../models/subTask.model');
const { GoogleGenerativeAI } = require('@google/generative-ai');


const allowedStatuses = ['Todo', 'Doing', 'Done'];

const createIntentPatterns = [
     /\b(create|add|make|generate|build)\b/i,
     /\b(task|todo|to-?do)\b/i,
];


const parseAiJsonResponse = (text) => {
     const cleanedText = text
          .trim()
          .replace(/^```json\s*/i, '')
          .replace(/^```\s*/i, '')
          .replace(/```$/i, '')
          .trim();

     const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
     const jsonText = jsonMatch ? jsonMatch[0] : cleanedText;

     return JSON.parse(jsonText);
}


const persistTaskInBoard = async (boardId, task) => {
     const board = await BoardModel.findById(boardId);

     if (!board) {
          throw new Error('Board not found');
     }

     let subTaskIds = [];

     if (task.subtask && task.subtask.length) {
          subTaskIds = await Promise.all(task.subtask.map(async (subTaskTitle) => {
               const newSubTask = new SubTaskModel({ title: subTaskTitle });
               await newSubTask.save();
               return newSubTask._id;
          }))
     }

     const newTask = new TaskModel({ ...task, subtask: subTaskIds });

     board.tasks = [...board.tasks, newTask._id];

     await newTask.save();
     await board.save();

     return { board, newTask };
}


const createTask = async (req, res) => {
     const boardId = req.params.id;
     const task = req.body;
     try {
          const { board } = await persistTaskInBoard(boardId, task);

          res.status(201).send({ message: `Task Created Successfully in ${board.name}` });
     } catch (error) {
          console.log('error:', error);
          res.status(500).send({ message: error.message, error });
     }
}


const updateTask = async (req, res) => {
     const taskId = req.params.id;
     const updates = req.body;
     try {
          await TaskModel.findByIdAndUpdate(taskId, updates)

          res.status(200).send({ message: "Task updated Successfully" })
     } catch (error) {
          console.log('error:', error)
          res.status(500).send({ message: error.message, error });
     }
}


const deleteTask = async (req, res) => {
     const taskId = req.params.id;
     const { boardId } = req.body;
     try {
          const task = await TaskModel.findById(taskId);
          const board = await BoardModel.findById(boardId);

          // ? Delete the task reference from the board;
          board.tasks = board.tasks.filter(el => el.toString() !== taskId);
          await board.save();

          // ? Delete all subtasks which are under task we have.
          try {
               await Promise.all(task.subtask.map(async el => await SubTaskModel.findByIdAndDelete(el)))
          } catch (error) {
               console.log('error:', error)
               res.status(500).send({ message: 'Getting error while deleting the Subtasks', error });
               return;
          }
          await TaskModel.findByIdAndDelete(taskId)

          res.status(200).send({ message: "Task deleted Successfully" })
     } catch (error) {
          console.log('error:', error)
          res.status(500).send({ message: error.message, error });
     }
}


// Generate description for task using AI
const generateDescriptionForTask = async (req, res) => {
     const { title } = req.body;
     try {
          if (!title) {
               res.status(400).send({ message: "Task title is required to generate description" });
               return;
          }

          // Initialize Gemini AI (model can be configured via GEMINI_MODEL env)
          const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
          const modelName = process.env.GEMINI_MODEL || "gemini-3-flash-preview";
          const model = genAI.getGenerativeModel({ model: modelName });

          const prompt = `Generate a brief, professional, and concise description (2-3 sentences) for a task titled: "${title}".\nThe description should be clear and help understand what the task is about. Only provide the description text, nothing else.`;

          const result = await model.generateContent(prompt);
          const generatedDescription = result.response.text();

          res.status(200).send({
               message: "Description generated successfully",
               description: generatedDescription
          });
     } catch (error) {
          console.log('error in generateDescriptionForTask:', error);
          res.status(500).send({ message: error.message, error });
     }
}


const createTaskFromPrompt = async (req, res) => {
     const boardId = req.params.id;
     const { prompt } = req.body;

     try {
          if (!prompt) {
               res.status(400).send({ message: 'Task prompt is required' });
               return;
          }

          const normalizedPrompt = prompt.trim();
          const isCreateIntent = createIntentPatterns.every((pattern) => pattern.test(normalizedPrompt));

          if (!isCreateIntent) {
               res.status(400).send({
                    message: 'I can only create tasks. Please ask me to create a task, and handle status changes, edits, or deletes manually.'
               });
               return;
          }

          const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
          const modelName = process.env.GEMINI_MODEL || 'gemini-3-flash-preview';
          const model = genAI.getGenerativeModel({ model: modelName });

          const explicitSubtaskCountMatch = normalizedPrompt.match(/\b([1-9]\d*)\s+(?:subtasks?|steps?)\b/i);
          const requestedSubtaskLimit = explicitSubtaskCountMatch ? Math.min(Number(explicitSubtaskCountMatch[1]), 10) : 3;

          const aiPrompt = `You are an assistant that converts a natural language request into a JSON task.
Return only valid JSON with exactly these keys: title, description, status, subtasks.
Rules:
- title must be a short task title.
- description is optional, but if provided it must be 1-3 concise sentences. If the user does not ask for a description, create a short helpful one yourself.
- status must be one of Todo, Doing, Done. If not mentioned, use Todo.
- subtasks must be an array of short strings. Use an empty array if none are mentioned.
- By default, include up to ${requestedSubtaskLimit} subtasks. If the user explicitly requests a number, honor it up to 10.
- Do not include markdown, code fences, or any extra text.

User request: "${prompt}"`;

          const result = await model.generateContent(aiPrompt);
          const generatedText = result.response.text();
          const parsedTask = parseAiJsonResponse(generatedText);

          const title = typeof parsedTask.title === 'string' ? parsedTask.title.trim() : '';
          if (!title) {
               res.status(400).send({ message: 'AI could not generate a valid task title' });
               return;
          }

          const description = typeof parsedTask.description === 'string' ? parsedTask.description.trim() : '';
          const status = allowedStatuses.includes(parsedTask.status) ? parsedTask.status : 'Todo';
          const subtask = Array.isArray(parsedTask.subtasks) ? parsedTask.subtasks.filter(item => typeof item === 'string' && item.trim()).slice(0, requestedSubtaskLimit) : [];

          const { board } = await persistTaskInBoard(boardId, { title, description, status, subtask });

          res.status(201).send({
               message: `Task Created Successfully in ${board.name}`,
               task: { title, description, status, subtask }
          });
     } catch (error) {
          console.log('error in createTaskFromPrompt:', error);
          res.status(500).send({ message: error.message, error });
     }
}


module.exports = { createTask, updateTask, deleteTask, generateDescriptionForTask, createTaskFromPrompt };