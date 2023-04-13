import React, { useRef, useState } from 'react';
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
} from '@chakra-ui/react'
import { RxCross2 } from 'react-icons/rx'
import { BsCheckLg } from 'react-icons/bs'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { TbEdit } from 'react-icons/tb'

function Task({ t }) {
     const { _id, title, description, status, subtask } = t;

     const { onOpen, onClose, isOpen } = useDisclosure();

     const editNameRef = useRef();
     const editDescRef = useRef();

     const [editName, setEditName] = useState(false);
     const [editDesc, setEditDesc] = useState(false);


     const handleEditName = () => {
          console.log(editNameRef.current.value)
     }

     const handleEditDesc = () => {
          console.log(editDescRef.current.value)
     }

     const handleSubTaskChange = (e) => {
          console.log(e.target.checked)
     }

     const handleTaskChange = (e) => {
          console.log(e.target.value);
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
                                   <RiDeleteBin6Line />
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
                                                  <input
                                                       type='checkbox'
                                                       defaultChecked={e.isCompleted}
                                                       onChange={(e) => handleSubTaskChange(e)} />
                                                  <Text
                                                       color={e.isCompleted ? 'gray' : '#000'}
                                                       as={e.isCompleted ? 's' : 'p'}>
                                                       {e.title}
                                                  </Text>
                                                  <TbEdit />
                                             </div>)
                                        )
                                   }
                              </div>

                              <div className='input-div'>
                                   <label>Current Status</label>
                                   <Select onChange={handleTaskChange} defaultValue={status}>
                                        <option value="Todo">Todo</option>
                                        <option value="Doing">Doing</option>
                                        <option value="Done">Done</option>
                                   </Select>
                              </div>
                         </ModalBody>
                    </ModalContent>
               </Modal>
          </>
     )
}

export default Task