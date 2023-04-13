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
     Text,
     Heading,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../redux/auth/auth.actions';
import useToastMsg from '../customHooks/useToastMsg';
import { Link, useNavigate } from 'react-router-dom';

function Signin() {

     const dispatch = useDispatch();
     const { loading } = useSelector(store => store.authManager);
     const [showPassword, setShowPassword] = useState(false);
     const toastMsg = useToastMsg()

     const navigate = useNavigate();

     const emailRef = useRef()
     const pwdRef = useRef()

     const handleLogin = () => {
          const user = {
               email: emailRef.current.value,
               password: pwdRef.current.value
          }

          dispatch(signin(user, navigate, toastMsg));
          emailRef.current.value = "";
          pwdRef.current.value = "";
     }

     return (
          <Flex
               minH="100vh"
               align={'center'}
               justify={'center'}
               bg={useColorModeValue('gray.50', 'gray.800')}>
               <Stack spacing={8} mx={'auto'} maxW={'lg'}>
                    <Stack align={'center'}>
                         <Heading fontSize={'4xl'} textAlign={'center'}>
                              Sign-in on Kanban
                         </Heading>
                         <Text fontSize={'lg'} color={'gray.600'}>
                              to maintain your tasks easily ✌️
                         </Text>
                    </Stack>
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
                                             <span
                                                  role='button'
                                                  variant={'ghost'}
                                                  onClick={() =>
                                                       setShowPassword((showPassword) => !showPassword)
                                                  }>
                                                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                             </span>
                                        </InputRightElement>
                                   </InputGroup>
                              </FormControl>
                              <Stack spacing={10}>
                                   <Button
                                        isLoading={loading}
                                        loadingText='Wait'
                                        onClick={handleLogin}
                                        bg={'blue.400'}
                                        color={'white'}
                                        _hover={{
                                             bg: 'blue.500',
                                        }}>
                                        Log in
                                   </Button>
                              </Stack>
                              <Stack pt={6}>
                                   <Text align={'center'}>
                                        New user? <Link to="/signup" style={{ color: 'blue' }}>Sign up</Link>
                                   </Text>
                              </Stack>
                         </Stack>
                    </Box>
               </Stack>
          </Flex>
     )
}

export default Signin