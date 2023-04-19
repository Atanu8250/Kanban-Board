import React, { useState } from 'react';
import { FaTasks } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import {
     Box,
     Button,
     Flex,
     HStack,
     Heading,
     Spacer,
     Text,
     Modal,
     ModalOverlay,
     ModalContent,
     ModalHeader,
     ModalBody,
     useDisclosure,
     Select,
     Textarea,
     Input,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import useToastMsg from '../customHooks/useToastMsg';
import { postTask } from '../redux/tasks/tasks.actions';

function Navbar() {
     const { data } = useSelector(store => store.tasksManager);
     const { isOpen, onOpen, onClose } = useDisclosure()
     const [subtasks, setSubtasks] = useState([""]);
     const dispatch = useDispatch();
     const toastMsg = useToastMsg();


     const handleSubmit = (e) => {
          e.preventDefault();
          const { title, desc, status } = e.target;
          const task = {
               title: title.value,
               description: desc.value,
               status: status.value,
               subtask: subtasks.filter(e => e)
          }

          dispatch(postTask(data._id, task, toastMsg))

          e.target.reset()
          setSubtasks([""])
          onClose()
     }

     const handleAddSubTaskInput = () => {
          setSubtasks([...subtasks, ''])
     }

     const handleChange = (e, i) => {
          let valueChangedSubTasks = [...subtasks];
          valueChangedSubTasks[i] = e.target.value;
          setSubtasks(valueChangedSubTasks);
     }

     const handleDeleteSubTask = (ind) => {
          let updatedSubTasks = [...subtasks];
          updatedSubTasks.splice(ind, 1);
          setSubtasks(updatedSubTasks)
     }

     return (
          <>
               <Flex minWidth='max-content' alignItems='center' gap='2' p="10px 15px" bgColor="#fff" position='sticky' top='0' left='0' zIndex='5'>
                    <Box p='2'>
                         <NavLink to="/">
                              <HStack>
                                   <FaTasks fontSize="20px" />
                                   <Heading display={{base: 'none', sm: 'inline-block'}} size='md'>Kanban Board</Heading>
                              </HStack>
                         </NavLink>
                    </Box>
                    <Spacer />
                    <Button onClick={onOpen}>
                         <HStack>
                              <AiOutlinePlus />
                              <Text>Add New Task</Text>
                         </HStack>
                    </Button>
               </Flex>


               {/* Create Task Modal */}
               <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                         <ModalHeader>Add New Task</ModalHeader>
                         <ModalBody>
                              <form id="create-task-form" onSubmit={handleSubmit}>
                                   <div className='input-div'>
                                        <label>Task Name</label>
                                        <Input id='title' type="text" required />
                                   </div>
                                   <div className='input-div'>
                                        <label>Description</label>
                                        <Textarea id='desc' cols="30" rows="3" required></Textarea>
                                   </div>
                                   <div className='input-div'>
                                        <label>Subtasks</label>
                                        {
                                             subtasks.map((el, i) => <div key={i} className='subtask-input'>
                                                  <Input type='text' value={el} onChange={(e) => handleChange(e, i)} />
                                                  <Text role='button' onClick={() => handleDeleteSubTask(i)}>❌</Text>
                                             </div>)
                                        }
                                        <Button onClick={handleAddSubTaskInput}>+ Add New Subtask</Button>
                                   </div>
                                   <div className='input-div'>
                                        <label>Current Status</label>
                                        <Select id='status' required>
                                             <option value="Todo">➕ Todo</option>
                                             <option value="Doing">⏳ Doing</option>
                                             <option value="Done">✔ Done</option>
                                        </Select>
                                   </div>
                                   <Button type='submit' isLoading={false}>Create Task</Button>
                              </form>
                         </ModalBody>
                    </ModalContent>
               </Modal >
          </>
     )
}

export default Navbar