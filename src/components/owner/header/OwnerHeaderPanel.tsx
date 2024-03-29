import {
    Avatar,
    Button,
    Center,
    Flex,
    Heading,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Spacer,
} from '@chakra-ui/react';
import { useStore } from 'zustandStore/store';
import useAuth from 'hooks/useAuth';
import { MdDashboard, MdPeople } from 'react-icons/md';

export const OwnerHeaderPanel = () => {
    const user = useStore((state) => state.user);
    const { logout } = useAuth();

    return (
        <>
            <Flex m={0} p={0} mb={2}>
                <Heading>GradeRef ⚽ - owner dashboard</Heading>
                <Spacer />

                <Flex alignItems={'center'}>
                    <Button mr={3} onClick={() => undefined} leftIcon={<MdPeople />}>
                        Mock button 1
                    </Button>
                    <Button mr={3} onClick={() => undefined} leftIcon={<MdDashboard />}>
                        Mock button 2
                    </Button>

                    <Menu>
                        <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                            <Avatar name={user.firstName + ' ' + user.lastName} size={'md'} />
                        </MenuButton>
                        <MenuList alignItems={'center'}>
                            <br />
                            <Center>
                                <Avatar name={user.firstName + ' ' + user.lastName} size={'xl'} />
                            </Center>
                            <br />
                            <Center>
                                <p>
                                    {user.firstName} {user.lastName}
                                </p>
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
    );
};
