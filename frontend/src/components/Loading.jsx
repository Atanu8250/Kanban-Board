import { Center, Heading, Spinner, VStack } from '@chakra-ui/react'

function Loading() {
     return (
          <Center minH='100svh'>
               <VStack gap='20px'>
                    <Spinner color='var(--primary-color)' thickness='4px' size='xl' />
                    <Heading size="md">Please Wait...</Heading>
               </VStack>
          </Center>
     )
}

export default Loading