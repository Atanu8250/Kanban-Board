import { useToast } from '@chakra-ui/react';

function useToastMsg() {
     const toast = useToast()

     return ({ title, desc = "", status }) => {
          toast({
               title,
               description: desc,
               status,
               position: 'top-right',
               duration: 3500
          })
     }
}

export default useToastMsg