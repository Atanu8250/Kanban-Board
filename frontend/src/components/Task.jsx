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

function Task() {
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
                    <Text className='task-heading'>Build UI for Search</Text>
                    <Text className='subtask-info'>1 of 3 subtasks</Text>
               </Box>

               <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent className='edit-subtask'>
                         <ModalHeader>
                              {
                                   editName ?
                                        <HStack className='task-input'>
                                             <input defaultValue={'Build UI for Search'} ref={editNameRef} />
                                             <HStack>
                                                  <BsCheckLg onClick={handleEditName} />
                                                  <RxCross2 onClick={() => setEditName(false)} />
                                             </HStack>
                                        </HStack> :
                                        <Heading onDoubleClick={() => setEditName(true)}>Build UI for Search</Heading>
                              }
                              <RiDeleteBin6Line />
                         </ModalHeader>
                         <ModalBody>
                              {
                                   editDesc ?
                                        <HStack className='task-input'>
                                             <input defaultValue={'Build UI for Searching for RM-Mock'} ref={editDescRef} />
                                             <HStack>
                                                  <BsCheckLg onClick={handleEditDesc} />
                                                  <RxCross2 onClick={() => setEditDesc(false)} />
                                             </HStack>
                                        </HStack> :
                                        <Text onDoubleClick={() => setEditDesc(true)}>Build UI for Searching for RM-Mock</Text>
                              }

                              <div className='input-div'>
                                   <label>Subtasks (1 of 2)</label>
                                   {
                                        [0, 1].map((e, i) => (
                                             <div key={i} className='subtask'>
                                                  <input type='checkbox' defaultChecked={e} onChange={(e) => handleSubTaskChange(e)} />
                                                  <Text color={e ? 'gray' : '#000'} as={e ? 's' : 'p'}>Complete Backend</Text>
                                             </div>)
                                        )
                                   }
                              </div>

                              <div className='input-div'>
                                   <label>Current Status</label>
                                   <Select onChange={handleTaskChange}>
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