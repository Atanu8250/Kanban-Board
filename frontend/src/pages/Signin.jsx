import React, { useRef, useState } from 'react'
import {
     Flex,
     Box,
     FormControl,
     FormLabel,
     Input,
     Stack,
     Button,
     useColorModeValue,
     InputGroup,
     InputRightElement,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';

function Signin() {

     const dispatch = useDispatch();
     const { loading } = useSelector(store => store.authManager);
     const [showPassword, setShowPassword] = useState(false);

     const emailRef = useRef()
     const pwdRef = useRef()

     const handleLogin = () => {
          const user = {
               email: emailRef.current.value,
               password: pwdRef.current.value
          }

          // dispatch((user));
          emailRef.current.value = "";
          pwdRef.current.value = "";

     }

     return (
          <Flex
               align={'center'}
               justify={'center'}
               bg={useColorModeValue('gray.50', 'gray.800')}>
               <Stack spacing={8} mx={'auto'} maxW={'lg'}>
                    <Box
                         rounded={'lg'}
                         bg={useColorModeValue('white', 'gray.700')}
                         boxShadow={'lg'}
                         p={8}>
                         <Stack spacing={4}>
                              <FormControl id="email">
                                   <FormLabel>Email address</FormLabel>
                                   <Input type="email" ref={emailRef} />
                              </FormControl>
                              <FormControl id="password">
                                   <FormLabel>Password</FormLabel>
                                   <InputGroup>
                                        <Input type={showPassword ? 'text' : 'password'} ref={pwdRef} />
                                        <InputRightElement h={'full'}>
                                             <Button
                                                  variant={'ghost'}
                                                  onClick={() =>
                                                       setShowPassword((showPassword) => !showPassword)
                                                  }>
                                                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                             </Button>
                                        </InputRightElement>
                                   </InputGroup>
                              </FormControl>
                              <Stack spacing={10}>
                                   <Button
                                        isLoading={loading}
                                        onClick={handleLogin}
                                        bg={'blue.400'}
                                        color={'white'}
                                        _hover={{
                                             bg: 'blue.500',
                                        }}>
                                        Log in
                                   </Button>
                              </Stack>
                         </Stack>
                    </Box>
               </Stack>
          </Flex>
     )
}

export default Signin