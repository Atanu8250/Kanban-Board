import { useSelector } from 'react-redux';
import { Text, Box } from '@chakra-ui/react';
import { Droppable } from 'react-beautiful-dnd';
import React, { useEffect, useState } from 'react';

import Task from './Task'

function TaskSection({ title }) {
     const { data: board } = useSelector(store => store.tasksManager);

     const [filteredTasks, setFilteredTasks] = useState([])

     const getFilteredTasks = () => {
          setFilteredTasks(board.tasks.filter(e => e.status === title));
     }

     useEffect(() => {
          getFilteredTasks();
     }, [board])

     return (<Droppable droppableId={title + "_section"}>
          {(provided, snapshot) =>
               <Box
                    className={`task-section ${snapshot.isDraggingOver && 'task-dragging-over'}`}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
               >
                    <Text className='subHeading-text' data-title={title}>{title} ({filteredTasks?.length})</Text>
                    {
                         filteredTasks?.map((el, i) => <Task key={i} t={el} index={i} />)
                    }
                    {provided.placeholder}
               </Box>
          }
     </Droppable>)
}

export default TaskSection