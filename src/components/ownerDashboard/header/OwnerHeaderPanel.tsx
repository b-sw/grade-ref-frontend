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
import {Paths} from "../../../shared/Paths";
import { MdDashboard, MdPeople } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export const OwnerHeaderPanel = () => {
  const user = useStore((state) => state.user);
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <Flex m={0} p={0} pb={10}>
        <Heading>GradeRef ⚽ - owner dashboard</Heading>
        <Spacer />

        <Flex alignItems={'center'}>
          <Button mr={3} onClick={() => {}} leftIcon={<MdPeople />}>
            Mock button 1
          </Button>
          <Button mr={3} onClick={() => {navigate(Paths.ADMIN_EXPLORER)}} leftIcon={<MdDashboard />}>
            Mock button 2
          </Button>

          <Menu>
            <MenuButton
              as={Button}
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
              minW={0}>
              <Avatar
                name={user.firstName + ' ' + user.lastName}
                size={'md'}
              />
            </MenuButton>
            <MenuList
              alignItems={'center'}
            >
              <br />
              <Center>
                <Avatar
                  name={user.firstName + ' ' + user.lastName}
                  size={'xl'}
                />
              </Center>
              <br />
              <Center>
                <p>{user.firstName} {user.lastName}</p>
              </Center>
              <br />
              <MenuDivider />
              <MenuItem>Account Settings</MenuItem>
              <MenuItem onClick={() => logout()}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </>
  )
}