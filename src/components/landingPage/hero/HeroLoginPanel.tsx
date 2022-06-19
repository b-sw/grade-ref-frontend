import {
  Button,
  Flex,
  useDisclosure,
} from '@chakra-ui/react';
import GoogleLogin from 'react-google-login';
import {useEffect} from "react";
import {LoginFailureModal} from "../../other/LoginFailureModal";
import useAuth from "../../../hooks/useAuth";
import {Constants} from "../../../shared/Constants";
import { Google } from 'react-bootstrap-icons';

export const HeroLoginPanel = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { loginMutation } = useAuth();

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
      <Flex p={5}>
        <GoogleLogin
          clientId={Constants.GOOGLE_OAUTH_CLIENT_ID}
          onSuccess={(googleData: any) => loginMutation.mutate(googleData)}
          onFailure={(something: any) => console.log(something)}
          cookiePolicy={'single_host_origin'}
          render={(renderProps: { onClick: () => void, disabled?: boolean }) => (
            <Button
              colorScheme={'messenger'}
              onClick={renderProps.onClick}
              isLoading={loginMutation.isLoading}
              leftIcon={<Google />}
            >
              Log in with Google
            </Button>
          )}
        />
      </Flex>
    </>
  );
}