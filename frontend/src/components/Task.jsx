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

import React, { useRef, useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import useToastMsg from '../customHooks/useToastMsg';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSubTask, deleteTask, updateSubTask, updateTask } from '../redux/tasks/tasks.actions';



function Task({ t }) {
     const { _id: taskId, title, description, status, subtask } = t;

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
               console.log(editNameRef.current.value);
               dispatch(updateTask(taskId, boardId, { title: editNameRef.current.value }, toastMsg));
          }
     }

     const handleEditDesc = () => {
          if (editDescRef.current.value !== description) {
               console.log(editDescRef.current.value);
               dispatch(updateTask(taskId, boardId, { description: editDescRef.current.value }, toastMsg));
          }
     }

     const handleEditSubtaskName = (oldSubTaskTitle) => {
          if (editSubtaskRef.current.value !== oldSubTaskTitle) {
               console.log(editSubtaskRef.current.value);
               dispatch(updateSubTask(editSubtask, boardId, { title: editSubtaskRef.current.value }, toastMsg));
               setEditSubtask(-1);
          }
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
     }

     const handleSubtaskDelete = (subtaskId) => {
          dispatch(deleteSubTask(subtaskId, taskId, boardId, toastMsg))
     }


     return (
          <>
               <Box className='task' onClick={onOpen}>
                    <Text className='task-heading'>{title}</Text>
                    <Text className='subtask-info'>
                         {subtask.filter(e => e.isCompleted).length} of {subtask.length} subtasks
                    </Text>
               </Box>

               <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
                    <ModalOverlay />
                    <ModalContent className='edit-subtask'>
                         <ModalHeader>
                              {
                                   editName ?
                                        <HStack className='task-input'>
                                             <input defaultValue={title} ref={editNameRef} />
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
                                             <input defaultValue={description} ref={editDescRef} />
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
                                                                 <input type='text' defaultValue={e.title} ref={editSubtaskRef} />
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
                         </ModalBody>
                    </ModalContent>
               </Modal>
          </>
     )
}

export default Task