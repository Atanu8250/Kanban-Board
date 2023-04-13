import React, { useRef, useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { RxCross2 } from 'react-icons/rx';
import { AiOutlinePlus } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri'
import { BsGrid1X2, BsCheckLg } from 'react-icons/bs';
import { MdOutlineDeleteForever } from 'react-icons/md'
import { Button, HStack, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack, useDisclosure } from '@chakra-ui/react';

function Sidebar() {
     const newBoardNameRef = useRef();
     const editBoardNameRef = useRef();
     const deleteBoardRef = useRef();

     const { isOpen, onOpen, onClose } = useDisclosure();

     const [activeBtn, setActiveBtn] = useState(1);
     const [boards, setBoards] = useState([1, 2, 3, 4, 5, 6]);
     const [editBoardOpt, setEditBoardOpt] = useState(-1);
     const [createBoardOpt, setCreateBoardOpt] = useState(false)

     console.log('editBoardOpt:', editBoardOpt)

     const handleCreateBoard = () => {
          let boardName = newBoardNameRef.current.value || `Board ${boards.length + 1}`;
          console.log('boardName:', boardName)
          setCreateBoardOpt(false);
     }

     const handleEditBoard = (boardId) => {
          console.log(editBoardNameRef.current.value, boardId);
     }

     const handleDeleteBoard = () => {
          // ! dispatch(deleteBoard(deleteBoardRef.current))
     }



     return (
          <>
               <VStack alignItems="flex-start">
                    <Text className='subHeading-text'>ALL BOARDS ({boards.length})</Text>
                    {
                         boards.map((el, i) => (
                              <Button
                                   className={`board-option ${(activeBtn === i + 1) ? 'active-board' : 'non-active-board'}`}
                                   key={i}>
                                   <HStack>
                                        <HStack onClick={() => setActiveBtn(i + 1)}>
                                             <BsGrid1X2 />
                                             {
                                                  editBoardOpt === i + 1 ?
                                                       <HStack className='edit-board-input'>
                                                            <input defaultValue={'Board ' + (i + 1)} ref={editBoardNameRef} />
                                                            <HStack>
                                                                 <BsCheckLg onClick={() => handleEditBoard(i + 1)} />
                                                                 <RxCross2 onClick={() => setEditBoardOpt(-1)} />
                                                            </HStack>
                                                       </HStack> :
                                                       <Text>Board {i + 1}</Text>
                                             }
                                        </HStack>
                                        {
                                             editBoardOpt === -1 && <HStack className='board-controller'>
                                                  <CiEdit onClick={()=> setEditBoardOpt(i + 1)} />
                                                  <MdOutlineDeleteForever onClick={() => {
                                                       deleteBoardRef.current = i + 1;
                                                       onOpen()
                                                  }} />
                                             </HStack>
                                        }
                                   </HStack>
                              </Button>)
                         )
                    }

                    {
                         createBoardOpt && (<HStack className='new-board-input'>
                              <Input placeholder='Board Name' ref={newBoardNameRef} />
                              <HStack>
                                   <BsCheckLg onClick={handleCreateBoard} />
                                   <RxCross2 onClick={() => setCreateBoardOpt(false)} />
                              </HStack>
                         </HStack>)
                    }

                    <Button className='new-board-btn' onClick={() => setCreateBoardOpt(!createBoardOpt)}>
                         <HStack>
                              {createBoardOpt ? <RxCross2 /> : <AiOutlinePlus />}
                              <Text>{createBoardOpt ? 'Close create Option' : 'create New Board'}</Text>
                         </HStack>
                    </Button>
               </VStack >


               <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size='xs'>
                    <ModalOverlay />
                    <ModalContent>
                         <ModalHeader pb='0px'>Are you sure?</ModalHeader>
                         <ModalBody>
                              <Text>Delte Board {deleteBoardRef.current}</Text>
                         </ModalBody>
                         <ModalFooter>
                              <Button borderRadius="none" colorScheme='blue' mr={3} onClick={onClose}>
                                   Close
                              </Button>
                              <Button p="0" onClick={handleDeleteBoard}>
                                   <HStack bgColor='red.400' h="full" w="full" p="15px">
                                        <RiDeleteBin6Line />
                                        <Text>Delete</Text>
                                   </HStack>
                              </Button>
                         </ModalFooter>
                    </ModalContent>
               </Modal>
          </>
     )
}

export default Sidebar