import { useToast } from '@chakra-ui/react';

function useToastMsg() {
     const toast = useToast()

     return ({ title, desc = "", status }) => {
          toast({
               title,
               description: desc,
               status,
               position: 'bottom-right',
               duration: 3000
          })
     }
}

export default useToastMsg