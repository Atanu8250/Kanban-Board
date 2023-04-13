import { Text, Box } from '@chakra-ui/react'
import React, { useState } from 'react'
import Task from './Task'

function TaskSection({ title }) {
     const [tasks, setTasks] = useState([1, 2, 3])

     return (
          <Box className='task-section'>
               <Text className='subHeading-text'>{title} ({tasks.length})</Text>
               {
                    tasks.map((el, i) => <Task key={i} />)
               }
          </Box>
     )
}

export default TaskSection