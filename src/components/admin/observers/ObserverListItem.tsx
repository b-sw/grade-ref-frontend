import { DeleteIcon } from '@chakra-ui/icons';
import { Badge, Flex, HStack, IconButton, Spacer, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { MdAssignment } from 'react-icons/md';
import { User } from 'entities/User';
import { ObserverRemoveModal } from 'components/admin/observers/ObserverRemoveModal';
import { ObserverGradesModal } from 'components/admin/observers/ObserverGradesModal';
import { useUserMatches } from 'hooks/useUserMatches';
import { TFunction, useTranslation } from 'react-i18next';

export interface Props {
  observer: User;
}

export const ObserverListItem = (props: Props) => {
  const { query: matchesQuery } = useUserMatches({ userId: props.observer.id });
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
  const { isOpen: isGradesModalOpen, onOpen: onGradesModalOpen, onClose: onGradesModalClose } = useDisclosure();
  const { t } = useTranslation();

  const handleOpenGradesModal = async () => {
    await matchesQuery.refetch();
    onGradesModalOpen();
  };

  return (
    <>
      <ObserverRemoveModal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose} observer={props.observer} />
      <ObserverGradesModal observer={props.observer} isOpen={isGradesModalOpen} onClose={onGradesModalClose} />
      <Flex p={3} borderRadius={10} alignItems={'center'} backgroundColor={'gray.50'}>
        {observerItem(props.observer, t)}
        <Spacer />
        <IconButton
          onClick={handleOpenGradesModal}
          variant={'ghost'}
          aria-label="See grades"
          icon={<MdAssignment />}
          isLoading={matchesQuery.isLoading}
        />
        <IconButton onClick={onDeleteModalOpen} variant={'ghost'} aria-label="Delete observer" icon={<DeleteIcon />} />
      </Flex>
    </>
  );
};

export const observerItem = (user: User, t: TFunction<'translation', undefined>) => {
  return (
    <>
      <HStack>
        {/*<Avatar name={user.firstName + ' ' + user.lastName} size={'sm'} />*/}
        <VStack spacing={0} alignItems={'baseline'}>
          <HStack>
            {
              <Badge colorScheme="purple" fontSize={'xs'}>
                {t('observer')}
              </Badge>
            }
            <Text fontSize={'md'}>
              {user.firstName} {user.lastName}
            </Text>
          </HStack>
          <VStack alignItems={'baseline'} spacing={0}>
            <Text fontSize={'sm'} color={'gray.400'}>
              {user.email}
            </Text>
            <Text fontSize={'sm'} color={'gray.400'}>
              {user.phoneNumber}
            </Text>
          </VStack>
        </VStack>
      </HStack>
    </>
  );
};
