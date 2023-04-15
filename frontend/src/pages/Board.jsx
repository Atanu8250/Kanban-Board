import { Box, Center, Flex, Heading, Image, VStack } from '@chakra-ui/react';
import React from 'react';
import Sidebar from '../components/Sidebar';
import TaskSection from '../components/TaskSection';
import Navbar from '../components/Navbar';
import Error from '../components/Error';
import { useSelector } from 'react-redux'

function Board() {
     const { error, data: board } = useSelector(store => store.tasksManager)
     return (
          <>
               <Navbar />

               <Flex>
                    <Box className='sidebar'>
                         <Sidebar />
                    </Box>
                    {
                         error.status ? (<Center>
                              <Error>
                                   <Heading size="md">{error.message}</Heading>
                              </Error>
                         </Center>) :
                              board.tasks ?
                                   (
                                        <Box className='tasks'>
                                             {/* Todo-section */}
                                             < TaskSection title='Todo' />

                                             {/* Doing-section */}
                                             <TaskSection title='Doing' />

                                             {/* Done-section */}
                                             <TaskSection title='Done' />
                                        </Box>

                                   ) :
                                   (
                                        <Center>
                                             <VStack>
                                                  <Image w="80%" src="https://learncab.com/assets/images/no-data-found.png" />
                                                  <Heading color='var(--primary-color)'>SELECT A BOARD TO SEE THE DATA</Heading>
                                             </VStack>
                                        </Center>
                                   )
                    }
               </Flex>
          </>
     )
}

export default Board