import { Text, Box, Spinner, Center, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Error from './Error';
import Task from './Task'
import { useSelector } from 'react-redux'

function TaskSection({ title }) {
     const { loading, error, data: board } = useSelector(store => store.tasksManager);

     const [filteredTasks, setFilteredTasks] = useState([])

     const getFilteredTasks = () => {
          board.tasks && setFilteredTasks(board.tasks.filter(e => e.status === title));
     }

     useEffect(() => {
          getFilteredTasks();
     }, [board])

     return loading ? (<Center>
          <Spinner size='lg' thickness='4px' speed='0.70s' color='var(--primary-color)' />
     </Center>) :
          // ! Error State
          error.status ? (<Center>
               <Error>
                    <Heading size="md">{error.message}</Heading>
               </Error>
          </Center>) :
               // ! Tasks fetched
               (<Box className='task-section'>
                    <Text className='subHeading-text'>{title} ({filteredTasks?.length})</Text>
                    {
                         filteredTasks?.map((el, i) => <Task key={i} t={el} />)
                    }
               </Box>)
}

export default TaskSection