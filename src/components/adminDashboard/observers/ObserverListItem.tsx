import { DeleteIcon } from '@chakra-ui/icons';
import { Flex, Spacer, IconButton, VStack, Text, useDisclosure, Avatar, HStack, Badge } from '@chakra-ui/react';
import { MdAssignment } from 'react-icons/md';
import {User} from "../../../entities/User";
import { ObserverRemoveModal } from './ObserverRemoveModal';

export interface Props {
  observer: User;
}

export const ObserverListItem = (props: Props) => {
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();

  return (
    <>
      <ObserverRemoveModal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose} observer={props.observer} />
      <Flex
        p={5}
        borderRadius={10}
        alignItems={'center'}
        backgroundColor={'gray.50'}
      >
        {observerItem(props.observer)}
        <Spacer />
        <IconButton onClick={() => {}} variant={'ghost'} aria-label='See grades' icon={<MdAssignment />} />
        <IconButton onClick={onDeleteModalOpen} variant={'ghost'} aria-label='Delete observer' icon={<DeleteIcon />} />
      </Flex>
    </>
  );
}

export const observerItem = (user: User,
                             avatarSize?: string,
                             nameSize?: string,
                             descriptionSize?: string,
                             showBadge?: boolean) => {
  return (
    <>
      <HStack>
        <Avatar
          name={user.firstName + ' ' + user.lastName}
          size={avatarSize ?? 'sm'}
        />
        <VStack spacing={0} alignItems={'baseline'}>
          <HStack>
            <Text fontSize={nameSize ?? 'md'}>{user.firstName} {user.lastName}</Text>
            {showBadge && <Badge colorScheme='purple' fontSize={'xs'}>Observer</Badge>}
          </HStack>
          <VStack alignItems={'baseline'} spacing={0}>
            <Text fontSize={descriptionSize ?? 'sm'} color={'gray.400'}>
              {user.email}
            </Text>
            <Text fontSize={descriptionSize ?? 'sm'} color={'gray.400'}>
              {user.phoneNumber}
            </Text>
          </VStack>
        </VStack>
      </HStack>
    </>
  )
}