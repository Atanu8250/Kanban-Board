import { Center, Spinner } from '@chakra-ui/react'

function Loading() {
     return (
          <Center minH='100svh'>
               <Spinner color='var(--primary-color)' thickness='4px' size='xl' />
          </Center>
     )
}

export default Loading