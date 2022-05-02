import {
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Center,
  Heading,
  Spacer,
} from '@chakra-ui/react';
import useStore from "../../../zustand/store";
import useAuth from "../../../hooks/useAuth";

export const HeaderPanel = () => {
  const user = useStore((state) => state.user);
  const { logout } = useAuth();

  return (
    <>
      <Flex m={0} p={0} pb={10}>
        <Heading>GradeRef ⚽</Heading>
        <Spacer />

        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              as={Button}
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
              minW={0}>
              <Avatar
                name={user.email!}
                size={'md'}
              />
            </MenuButton>
            <MenuList
              alignItems={'center'}
            >
              <br />
              <Center>
                <Avatar
                  name={user.email!}
                  size={'xl'}
                />
              </Center>
              <br />
              <Center>
                <p>{user.email}</p>
              </Center>
              <br />
              <MenuDivider />
              <MenuItem>Account Settings</MenuItem>
              <MenuItem onClick={() => logout()}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      {/*<Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>*/}
      {/*  <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>*/}
      {/*    <Box>GradeRef ⚽</Box>*/}

      {/*    */}
      {/*  </Flex>*/}
      {/*</Box>*/}
    </>
  )
}