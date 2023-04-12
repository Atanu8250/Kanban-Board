import { useToast } from '@chakra-ui/react';

function useToastMsg() {
     const toast = useToast()

     return ({ title, desc = "", status }) => {
          toast({
               title,
               description: desc,
               status,
               isClosable: true,
               position: 'bottom-right',
               variant: 'left-accent',
               duration: 4000
          })
     }
}

export default useToastMsg