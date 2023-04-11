const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
     title: {
          type: String,
          required: true,
     },
     description: {
          type: String,
          default: "",
     },
     status: {
          type: String,
          enum: {
               values: ['Todo', 'Doing', 'Done'],
               message: 'Please choose from this options: Todo, Doing or Done!',
          },
          default: 'Todo'
     },
     subtask: [
          {
               type: mongoose.Schema.Types.ObjectId,
               ref: 'subtask'
          }
     ]
}, { timestamps: true })

const TaskModel = mongoose.model('task', taskSchema);

module.exports = TaskModel;