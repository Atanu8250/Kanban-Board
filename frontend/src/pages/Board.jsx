import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Center, Flex, Heading, Image, VStack } from '@chakra-ui/react';

import lazyLoad from '../lazyLoad';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

// Paths are set relative to the lazyLoad file
const Error = lazyLoad('./components/Error');
const TaskSection = lazyLoad('./components/TaskSection');

import { updateTask } from '../redux/tasks/tasks.actions';
import useToastMsg from '../customHooks/useToastMsg';
import LazyLoadHandler from '../components/LazyLoadHandler';
import LoadingTask from '../components/LoadingTask';

function Board() {
     const { loading, error, data: board } = useSelector(store => store.tasksManager)
     const dispatch = useDispatch()
     const toastMsg = useToastMsg();

     const handleDragEnd = (result) => {
          const { destination, source, draggableId } = result;
          if (!result || !destination || (source.droppableId === destination.droppableId)) return;
          dispatch(updateTask(draggableId, board._id, { status: destination.droppableId.split("_")[0] }, toastMsg))
     }

     return (
          <>
               <Navbar />

               <Flex>
                    <Box className='sidebar'>
                         <Sidebar />
                    </Box>
                    {
                         error.status ? (
                              <LazyLoadHandler>
                                   <Center>
                                        <Error>
                                             <Heading size="md">{error.message}</Heading>
                                        </Error>
                                   </Center>
                              </LazyLoadHandler>
                         ) :
                              board.tasks ?
                                   (
                                        <>
                                             <DragDropContext onDragEnd={handleDragEnd}>
                                                  <Box className='tasks'>
                                                       {loading && <div className='loading-overlay'></div>}
                                                       {
                                                            ['Todo', 'Doing', 'Done'].map((el, ind) => <LazyLoadHandler suspenceFallback={<LoadingTask />} key={ind}>
                                                                 < TaskSection title={el} />
                                                            </LazyLoadHandler>)
                                                       }
                                                  </Box>
                                             </DragDropContext>
                                        </>

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