import React, { useState } from 'react';
import {
     Box,
     Button,
     HStack,
     Modal,
     ModalBody,
     ModalContent,
     ModalHeader,
     ModalOverlay,
     Text,
     Textarea,
     VStack,
} from '@chakra-ui/react';
import { FaRobot } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import useToastMsg from '../customHooks/useToastMsg';
import { createTaskFromPrompt } from '../redux/tasks/tasks.actions';

function TaskBot({ isOpen, onClose }) {
     const dispatch = useDispatch();
     const { data: board } = useSelector(store => store.tasksManager);
     const boardId = board?._id;
     const toastMsg = useToastMsg();

     const [prompt, setPrompt] = useState('');
     const [isSending, setIsSending] = useState(false);

     const handleSend = async () => {
          const trimmedPrompt = prompt.trim();
          if (!trimmedPrompt || isSending) return;

          if (!boardId) {
               toastMsg({
                    title: 'Select a board first',
                    desc: 'AI task creation needs an active board',
                    status: 'warning'
               });
               return;
          }

          setIsSending(true);

          try {
               const response = await dispatch(createTaskFromPrompt(boardId, trimmedPrompt, toastMsg));

               if (response?.ok && response?.task?.title) {
                    setPrompt('');
                    onClose();
               } else if (response?.message) {
                    setPrompt(trimmedPrompt);
               }
          } finally {
               setIsSending(false);
          }
     }

     const handleKeyDown = (event) => {
          if (event.key === 'Enter' && !event.shiftKey) {
               event.preventDefault();
               handleSend();
          }
     }

     return (
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
               <ModalOverlay />
               <ModalContent>
                    <ModalHeader>
                         <HStack>
                              <FaRobot />
                              <Text>AI Task Creator</Text>
                         </HStack>
                    </ModalHeader>
                    <ModalBody>
                         <VStack align='stretch' spacing='3' pb='4'>
                              <Box>
                                   <Text fontSize='sm' color='gray.600' mb='2'>
                                        Create tasks only. Ask me to create a task, and mention the title, description, and optional subtasks.
                                   </Text>
                                   <Textarea
                                        value={prompt}
                                        onChange={(event) => setPrompt(event.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder='Example: Create a task called Design login screen with subtasks wireframe, hero section, and validation.'
                                        resize='none'
                                        rows={7}
                                        disabled={isSending}
                                   />
                              </Box>

                              <HStack justifyContent='space-between'>
                                   <Text fontSize='xs' color='gray.500'>Press Enter to create, Shift+Enter for a new line</Text>
                                   <Button
                                        size='sm'
                                        leftIcon={<FaRobot />}
                                        bg='linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                        color='white'
                                        _hover={{ bg: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)' }}
                                        isLoading={isSending}
                                        onClick={handleSend}
                                   >
                                        Create by AI
                                   </Button>
                              </HStack>
                         </VStack>
                    </ModalBody>
               </ModalContent>
          </Modal>
     );
}

export default TaskBot;
