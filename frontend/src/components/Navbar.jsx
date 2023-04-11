import { Box, Button, ButtonGroup, Flex, Heading, Spacer } from '@chakra-ui/react'
import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
     return (
          <Flex minWidth='max-content' alignItems='center' gap='2' p="5px 10px">
               <Box p='2'>
                    <Heading size='md'>Kanban Board</Heading>
               </Box>
               <Spacer />
               <ButtonGroup gap='2'>
                    <NavLink to="/signup" ><Button colorScheme='teal'>Sign Up</Button></NavLink>
                    <NavLink to="/signin" ><Button colorScheme='teal'>Sign in</Button></NavLink>
               </ButtonGroup>
          </Flex>
     )
}

export default Navbar