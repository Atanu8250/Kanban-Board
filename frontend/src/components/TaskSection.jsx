import { Text, Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Task from './Task'
import { useSelector } from 'react-redux'

function TaskSection({ title }) {
     const { data: board } = useSelector(store => store.tasksManager);

     const [filteredTasks, setFilteredTasks] = useState([])

     const getFilteredTasks = () => {
          setFilteredTasks(board.tasks.filter(e => e.status === title));
     }

     useEffect(() => {
          getFilteredTasks();
     }, [board])

     return (<Box className='task-section'>
          <Text className='subHeading-text' data-title={title}>{title} ({filteredTasks?.length})</Text>
          {
               filteredTasks?.map((el, i) => <Task key={i} t={el} />)
          }
     </Box>)
}

export default TaskSection