import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import GoogleLogin from 'react-google-login';
import { useEffect } from 'react';
import { LoginFailureModal } from 'components/auth/LoginFailureModal';
import useAuth from '../../../hooks/useAuth';
import { Constants } from 'utils/Constants';
import { Google } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';

export const HeroLoginPanel = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loginMutation } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    const checkForFailure = () => {
      if (loginMutation.isError) {
        onOpen();
      }
    };
    checkForFailure();
  }, [loginMutation.status]);

  return (
    <>
      <LoginFailureModal onClose={onClose} isOpen={isOpen} />
      <Flex p={5}>
        <GoogleLogin
          clientId={Constants.GOOGLE_OAUTH_CLIENT_ID}
          onSuccess={(googleData: any) => loginMutation.mutate(googleData)}
          cookiePolicy={'single_host_origin'}
          render={(renderProps: { onClick: () => void; disabled?: boolean }) => (
            <Button
              colorScheme={'messenger'}
              onClick={renderProps.onClick}
              isLoading={loginMutation.isLoading}
              leftIcon={<Google />}
            >
              {t('hero.logIn')}
            </Button>
          )}
        />
      </Flex>
    </>
  );
};
