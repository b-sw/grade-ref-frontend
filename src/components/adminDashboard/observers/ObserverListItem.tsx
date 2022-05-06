import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Flex, Spacer, IconButton, VStack, Text, useDisclosure, Avatar, HStack } from '@chakra-ui/react';
import {User} from "../../../entities/User";
import { ObserverDeleteModal } from './ObserverDeleteModal';
import { ObserverEditModal } from './ObserverEditModal';

export interface Props {
  observer: User;
}

export const ObserverListItem = (props: Props) => {
  const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure();
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();

  return (
    <>
      <ObserverEditModal isOpen={isEditModalOpen} onClose={onEditModalClose} observer={props.observer} />
      <ObserverDeleteModal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose} observer={props.observer} />
      <Flex py={2} borderRadius={5} alignItems={'center'}>
        {observerItem(props.observer)}
        <Spacer />
        <IconButton onClick={onEditModalOpen} variant={'ghost'} aria-label='Edit observer' icon={<EditIcon />} />
        <IconButton onClick={onDeleteModalOpen} variant={'ghost'} aria-label='Delete observer' icon={<DeleteIcon />} />
      </Flex>
    </>
  );
}

export const observerItem = (user: User) => {
  return (
    <>
      <HStack>
        <Avatar
          name={user.firstName + ' ' + user.lastName}
          size={'sm'}
        />
        <VStack spacing={0} alignItems={'baseline'}>
          <Text>{user.firstName} {user.lastName}</Text>
          <Text fontSize={'sm'} color={'gray.400'}>
            {user.email}, {user.phoneNumber}
          </Text>
        </VStack>
      </HStack>
    </>
  )
}