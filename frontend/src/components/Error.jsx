import { Heading, VStack } from '@chakra-ui/react'
import React from 'react'

function Error({ children, CN }) {
     return (
          <VStack className={CN ?? ""}>
               <Heading size="sm" color='red.400' textAlign='cneter' >⚠ Error</Heading>
               {children}
          </VStack>
     )
}

export default React.memo(Error);