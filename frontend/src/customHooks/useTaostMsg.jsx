import { useToast } from '@chakra-ui/react';

function useTaostMsg() {
     const toast = useToast()

     return ({ title, desc = "", status }) => {
          toast({
               title,
               description: desc,
               status,
               isClosable: true,
               position: 'top-right',
               variant: 'left-accent',
               duration: 4000
          })
     }
}

export default useTaostMsg