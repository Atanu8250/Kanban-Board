import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import Sidebar from '../components/Sidebar'
import TaskSection from '../components/TaskSection'
import Navbar from '../components/Navbar'

function Board() {
  return (
    <>
      <Navbar />
      
      <Flex>
        <Box className='sidebar'>
          <Sidebar />
        </Box>
        <Box className='tasks'>
          {/* Todo-section */}
          <TaskSection title='Todo' />

          {/* Doing-section */}
          <TaskSection title='Doing' />

          {/* Done-section */}
          <TaskSection title='Done' />

        </Box>
      </Flex>
    </>
  )
}

export default Board