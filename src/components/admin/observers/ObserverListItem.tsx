import { DeleteIcon } from '@chakra-ui/icons';
import { Flex, Spacer, IconButton, VStack, Text, useDisclosure, Avatar, HStack, Badge } from '@chakra-ui/react';
import { MdAssignment } from 'react-icons/md';
import {User} from "entities/User";
import { ObserverRemoveModal } from 'components/admin/observers/ObserverRemoveModal';
import {ObserverGradesModal} from "components/admin/observers/ObserverGradesModal";
import { useUserMatches } from 'hooks/useUserMatches';

export interface Props {
  observer: User;
}

export const ObserverListItem = (props: Props) => {
  const { query: matchesQuery } = useUserMatches({ userId: props.observer.id });
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
  const { isOpen: isGradesModalOpen, onOpen: onGradesModalOpen, onClose: onGradesModalClose } = useDisclosure();

  const handleOpenGradesModal = async () => {
    await matchesQuery.refetch();
    onGradesModalOpen();
  }

  return (
    <>
      <ObserverRemoveModal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose} observer={props.observer} />
      <ObserverGradesModal observer={props.observer} isOpen={isGradesModalOpen} onClose={onGradesModalClose} />
      <Flex
        p={3}
        borderRadius={10}
        alignItems={'center'}
        backgroundColor={'gray.50'}
      >
        {observerItem(props.observer)}
        <Spacer />
        <IconButton
          onClick={handleOpenGradesModal}
          variant={'ghost'}
          aria-label='See grades'
          icon={<MdAssignment />}
          isLoading={matchesQuery.isLoading}
        />
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