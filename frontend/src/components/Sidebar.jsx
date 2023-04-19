import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiEdit } from 'react-icons/ci';
import { RxCross2 } from 'react-icons/rx';
import { AiOutlinePlus } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri'
import { BsGrid1X2, BsCheckLg } from 'react-icons/bs';
import { MdOutlineDeleteForever } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Button, HStack, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, Text, VStack, useDisclosure } from '@chakra-ui/react';
import { createBoard, deleteBoard, editBoard, getBoards } from '../redux/board/board.actions';
import Error from './Error';
import { getTasks } from '../redux/tasks/tasks.actions';

function Sidebar() {
     const navigate = useNavigate()
     const newBoardNameRef = useRef();
     const editBoardNameRef = useRef();
     const deleteBoardRef = useRef();

     const { isOpen, onOpen, onClose } = useDisclosure();

     const [activeBtn, setActiveBtn] = useState(0);
     const [editBoardOpt, setEditBoardOpt] = useState(-1);
     const [createBoardOpt, setCreateBoardOpt] = useState(false)

     const dispatch = useDispatch();
     const { loading, error, data: boards } = useSelector(store => store.boardManager);

     const handleCreateBoard = () => {
          dispatch(createBoard(newBoardNameRef.current.value))
          setCreateBoardOpt(false);
     }

     const handleEditBoard = () => {
          const newName = editBoardNameRef.current.value;
          const oldName = boards.filter(e => e._id === editBoardOpt)[0].name;
          if (newName !== oldName) dispatch(editBoard(editBoardOpt, newName));
          setEditBoardOpt(-1);
     }

     const handleDeleteBoard = () => {
          dispatch(deleteBoard(deleteBoardRef.current))
          setActiveBtn(0);
          onClose();
     }

     useEffect(() => {
          dispatch(getBoards(navigate))
     }, [])

     useEffect(() => {
          // ? short-circutting
          boards.length && +activeBtn > 0 && dispatch(getTasks(boards[((+activeBtn || 1) - 1)]._id, navigate))
     }, [activeBtn])

     return (
          <>
               <VStack alignItems="flex-start">
                    <Text className='subHeading-text'>ALL BOARDS ({boards.length})</Text>
                    {
                         loading ?
                              // ! Loading Skeletons
                              [1, 2, 3].map(e => <HStack className='skeleton-board-option' key={e}>
                                   <Skeleton height='28px' width='28px' />
                                   <Skeleton height='28px' width='9rem' />
                              </HStack>) :
                              error.status ?
                                   // ! Error Box
                                   <Error CN='error-board-option'><Text>{error.message}</Text></Error>
                                   :
                                   // ! Data fetched
                                   boards.map((board, i) => (
                                        <Button
                                             className={`board-option ${(activeBtn === i + 1) ? 'active-board' : 'non-active-board'}`}
                                             key={board._id}>
                                             <HStack>
                                                  {
                                                       editBoardOpt === board._id ?
                                                            <HStack className='edit-board-input'>
                                                                 <BsGrid1X2 />
                                                                 <input autoFocus defaultValue={board.name} ref={editBoardNameRef} />
                                                                 <HStack>
                                                                      <BsCheckLg onClick={handleEditBoard} />
                                                                      <RxCross2 onClick={() => setEditBoardOpt(-1)} />
                                                                 </HStack>
                                                            </HStack> :
                                                            <HStack onClick={() => {
                                                                 setActiveBtn(i + 1)
                                                            }}>
                                                                 <BsGrid1X2 />
                                                                 <Text>{board.name}</Text>
                                                            </HStack>
                                                  }
                                                  {
                                                       editBoardOpt === -1 && <HStack className='board-controller'>
                                                            <CiEdit onClick={() => setEditBoardOpt(board._id)} />
                                                            <MdOutlineDeleteForever onClick={() => {
                                                                 deleteBoardRef.current = board._id;
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
                              <Input defaultValue={`Board ${boards.length + 1}`} ref={newBoardNameRef} />
                              <HStack>
                                   <BsCheckLg onClick={handleCreateBoard} />
                                   <RxCross2 onClick={() => setCreateBoardOpt(false)} />
                              </HStack>
                         </HStack>)
                    }

                    <Button className='new-board-btn' onClick={() => setCreateBoardOpt(!createBoardOpt)}>
                         <HStack>
                              {createBoardOpt ? <RxCross2 /> : <AiOutlinePlus />}
                              <Text>{createBoardOpt ? 'Close create Option' : 'Create New Board'}</Text>
                         </HStack>
                    </Button>
               </VStack >


               <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size='sm'>
                    <ModalOverlay />
                    <ModalContent>
                         <ModalHeader pb='0px'>Are you sure?</ModalHeader>
                         <ModalBody>
                              <Text>It may make you fustrated, Be careful 😧</Text>
                              <Text>It consists a lot of data</Text>
                              <Text color='var(--primary-delete-color)'>🗑 Delete the Board</Text>
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