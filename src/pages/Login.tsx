import {
  Box,
  Flex,
  Heading,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import GoogleLogin from 'react-google-login';
import { Constants } from "../shared/Constants";
import useAuth from "../hooks/useAuth";
import {LoginFailureModal} from "../components/other/LoginFailureModal";
import {useEffect} from "react";

export const Login = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { loginMutation } = useAuth();
  const handleFailure = (result: any) => {
    console.log('failure', result);
  }

  useEffect(() => {
    const checkForFailure = () => {
      if (loginMutation.isError) {
        onOpen();
      }
    };
    checkForFailure();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginMutation.status]);

  return (
    <>
      <LoginFailureModal onClose={onClose} isOpen={isOpen}/>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        backgroundColor={'gray.400'}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Welcome to GradeRef ⚽</Heading>
          </Stack>
          <Box
            rounded={'lg'}
            backgroundColor={'gray.300'}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <GoogleLogin
                clientId={Constants.GOOGLE_OAUTH_CLIENT_ID}
                buttonText="Log in with Google"
                onSuccess={(googleData: any) => loginMutation.mutate(googleData)}
                onFailure={handleFailure}
                cookiePolicy={'single_host_origin'}
              />
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}