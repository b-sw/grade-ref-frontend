import { FcGoogle } from 'react-icons/fc';
import { Button, Center, Text } from '@chakra-ui/react';
import useAuth from "../../hooks/useAuth";

export default function GoogleButton() {
  const { loginMutation } = useAuth();

  return (
    <Center p={8}>
      <Button
        isLoading={false}
        onClick={(e) => {
          e.preventDefault();
          loginMutation.mutate();
        }}
        w={'full'}
        maxW={'md'}
        variant={'outline'}
        leftIcon={<FcGoogle />}>
        <Center>
          <Text>Sign in with Google</Text>
        </Center>
      </Button>
    </Center>
  );
}