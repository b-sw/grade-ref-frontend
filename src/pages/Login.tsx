import {
  Box,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import GoogleLogin from 'react-google-login';
import { Constants } from "../other/constants";
import useAuth from "../hooks/useAuth";
import {LoginFailureModal} from "../components/other/LoginFailureModal";

export const Login = () => {
  const { onOpen: showModal, modal: loginFailureModal } = LoginFailureModal();
  const { loginMutation } = useAuth();
  const handleFailure = (result: any) => {
    console.log('failure', result);
  }

  const handleLogin = (googleData: any) => {
    loginMutation.mutate(googleData);
    if (loginMutation.error) {
      showModal();
    }
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Welcome to GradeRef ⚽</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <GoogleLogin
              clientId={Constants.GOOGLE_OAUTH_CLIENT_ID}
              buttonText="Log in with Google"
              onSuccess={(googleData: any) => handleLogin(googleData)}
              onFailure={handleFailure}
              cookiePolicy={'single_host_origin'}
            />
          </Stack>
        </Box>
      </Stack>
      {loginFailureModal}
    </Flex>
  );
}