import React, { Suspense } from 'react';
import { useSelector } from 'react-redux'
import { ErrorBoundary } from 'react-error-boundary';
import { Box, Center, Flex, Heading, Image, VStack } from '@chakra-ui/react';

import lazyLoad from '../lazyLoad';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';
import Sidebar from '../components/Sidebar';
const Error = lazyLoad('./components/Error');
import TaskSection from '../components/TaskSection';
import ErrorFallback from '../components/ErrorFallback';

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
                         error.status ? (
                              <ErrorBoundary FallbackComponent={ErrorFallback}>
                                   <Suspense fallback={<Loading />}>
                                        <Center>
                                             <Error>
                                                  <Heading size="md">{error.message}</Heading>
                                             </Error>
                                        </Center>
                                   </Suspense>
                              </ErrorBoundary>
                         ) :
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