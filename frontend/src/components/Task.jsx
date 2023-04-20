import {
     Box,
     Text,
     Modal,
     ModalOverlay,
     ModalContent,
     ModalHeader,
     ModalBody,
     Heading,
     useDisclosure,
     Select,
     HStack,
} from '@chakra-ui/react';

import { TbEdit } from 'react-icons/tb';
import { RxCross2 } from 'react-icons/rx';
import { MdDelete } from 'react-icons/md';
import { BsCheckLg } from 'react-icons/bs';

import React, { useMemo, useRef, useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import useToastMsg from '../customHooks/useToastMsg';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSubTask, deleteTask, updateSubTask, updateTask } from '../redux/tasks/tasks.actions';
import { Draggable } from 'react-beautiful-dnd';

// Get local date and time
function getDateAndTime(createdAt) {
     const dateAndTime = new Date(createdAt);
     const [date, time] = dateAndTime.toLocaleTimeString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }).split(", ");
     return { date, time };
}


function Task({ t, index }) {
     const { _id: taskId, title, description, status, subtask, createdAt } = t;
     const { date, time } = useMemo(() => getDateAndTime(createdAt), [createdAt]);


     const dispatch = useDispatch();
     const { data: { _id: boardId } } = useSelector(store => store.tasksManager);

     const { onOpen, onClose, isOpen } = useDisclosure();
     const toastMsg = useToastMsg();

     const editNameRef = useRef();
     const editDescRef = useRef();
     const editSubtaskRef = useRef();

     const [editName, setEditName] = useState(false);
     const [editDesc, setEditDesc] = useState(false);
     const [editSubtask, setEditSubtask] = useState(-1);


     const handleEditName = () => {
          if (editNameRef.current.value !== title) {
               dispatch(updateTask(taskId, boardId, { title: editNameRef.current.value }, toastMsg));
          }
          setEditName(false)
     }

     const handleEditDesc = () => {
          if (editDescRef.current.value !== description) {
               dispatch(updateTask(taskId, boardId, { description: editDescRef.current.value }, toastMsg));
          }
          setEditDesc(false);
     }

     const handleEditSubtaskName = (oldSubTaskTitle) => {
          if (editSubtaskRef.current.value !== oldSubTaskTitle) {
               dispatch(updateSubTask(editSubtask, boardId, { title: editSubtaskRef.current.value }, toastMsg));
          }
          setEditSubtask(-1);
     }

     const handleTaskStatusChange = (e) => {
          if (e.target.value !== status) {
               dispatch(updateTask(taskId, boardId, { status: e.target.value }, toastMsg))
          }
     }

     const handleSubTaskStatusChange = (e, subtaskId) => {
          dispatch(updateSubTask(subtaskId, boardId, { isCompleted: e.target.checked }, toastMsg));
     }

     const handleTaskDelete = () => {
          dispatch(deleteTask(taskId, boardId, toastMsg));
          onClose();
     }

     const handleSubtaskDelete = (subtaskId) => {
          dispatch(deleteSubTask(subtaskId, taskId, boardId, toastMsg))
     }

     return (
          <>
               <Draggable draggableId={taskId} index={index}>
                    {
                         (provided, snapshot) => <Box
                              className={`task ${snapshot.isDragging && 'dragging-task'}`}
                              onClick={onOpen}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                         >
                              <Text className='task-heading' noOfLines={2} cursor='pointer'>{description}</Text>
                              <Text className='subtask-info'>
                                   {subtask.filter(e => e.isCompleted).length} of {subtask.length} subtasks
                              </Text>
                         </Box>
                    }
               </Draggable>

               <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
                    <ModalOverlay />
                    <ModalContent className='edit-subtask'>
                         <ModalHeader>
                              {
                                   editName ?
                                        <HStack className='task-input'>
                                             <input autoFocus defaultValue={title} ref={editNameRef} />
                                             <HStack>
                                                  <BsCheckLg onClick={handleEditName} />
                                                  <RxCross2 onClick={() => setEditName(false)} />
                                             </HStack>
                                        </HStack> :
                                        <Heading onDoubleClick={() => setEditName(true)}>Task: {title}</Heading>
                              }
                              <HStack>
                                   <TbEdit onClick={() => setEditName(true)} />
                                   <RiDeleteBin6Line onClick={handleTaskDelete} />
                              </HStack>
                         </ModalHeader>
                         <ModalBody>
                              {
                                   editDesc ?
                                        <HStack className='task-input'>
                                             <input autoFocus defaultValue={description} ref={editDescRef} />
                                             <HStack>
                                                  <BsCheckLg onClick={handleEditDesc} />
                                                  <RxCross2 onClick={() => setEditDesc(false)} />
                                             </HStack>
                                        </HStack> :
                                        <HStack justifyContent='space-between'>
                                             <Text onDoubleClick={() => setEditDesc(true)}>{description}</Text>
                                             <TbEdit
                                                  color='var(--primary-edit-color)'
                                                  onClick={() => setEditDesc(true)} />
                                        </HStack>
                              }

                              <div className='input-div'>
                                   <label>Subtasks ({subtask.filter(e => e.isCompleted).length} of {subtask.length})</label>
                                   {
                                        subtask.map((e, i) => (
                                             <div
                                                  key={i}
                                                  className='subtask'>
                                                  {
                                                       editSubtask === e._id ?
                                                            <>
                                                                 <input type='text' autoFocus defaultValue={e.title} ref={editSubtaskRef} />
                                                                 <HStack>
                                                                      <BsCheckLg onClick={() => handleEditSubtaskName(e.title)} />
                                                                      <RxCross2 onClick={() => setEditSubtask(-1)} />
                                                                 </HStack>
                                                            </> :
                                                            <>
                                                                 <input
                                                                      type='checkbox'
                                                                      defaultChecked={e.isCompleted}
                                                                      onChange={(evnt) => handleSubTaskStatusChange(evnt, e._id)} />
                                                                 <Text
                                                                      color={e.isCompleted ? 'gray' : '#000'}
                                                                      as={e.isCompleted ? 's' : 'p'}>
                                                                      {e.title}
                                                                 </Text>
                                                                 <HStack>
                                                                      <TbEdit onClick={() => setEditSubtask(e._id)} />
                                                                      <MdDelete onClick={() => handleSubtaskDelete(e._id)} />
                                                                 </HStack>
                                                            </>
                                                  }
                                             </div>)
                                        )
                                   }
                              </div>

                              <div className='input-div'>
                                   <label>Current Status</label>
                                   <Select onChange={handleTaskStatusChange} defaultValue={status}>
                                        <option value="Todo">➕ Todo</option>
                                        <option value="Doing">⏳ Doing</option>
                                        <option value="Done">✔ Done</option>
                                   </Select>
                              </div>
                              <HStack color='gray.600' fontSize='12px'>
                                   <bdi>Created at:</bdi>
                                   <Text>{date}  | 🕖 {time}</Text>
                              </HStack>
                         </ModalBody>
                    </ModalContent>
               </Modal>
          </>
     )
}

export default Task