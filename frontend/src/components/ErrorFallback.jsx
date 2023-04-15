import React from 'react'
import { WarningTwoIcon } from '@chakra-ui/icons';
import { Box, Button, Heading, Text } from '@chakra-ui/react';

export default function ErrorFallback({ error, resetErrorBoundary }) {
     return (
          <Box textAlign="center" py={10} px={6}>
               <WarningTwoIcon boxSize={'50px'} color={'orange.300'} />
               <Heading as="h2" size="xl" mt={6} mb={2}>
                    Something went wrong!
               </Heading>
               <Text color={'red.400'}>
                    {error.message}
               </Text>
               <Button
                    my='20px'
                    backgroundColor='var(--primary-color)'
                    color='#fff'
                    onClick={resetErrorBoundary}>
                    Try Again
               </Button>
          </Box>
     );
}