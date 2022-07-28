import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Avatar, Badge, Flex, HStack, IconButton, Spacer, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { MdAssignment } from 'react-icons/md';
import { User } from 'entities/User';
import { AdminDeleteModal } from 'components/owner/admins/AdminDeleteModal';
import { AdminEditModal } from 'components/owner/admins/AdminEditModal';

export interface Props {
  admin: User;
}

export const AdminListItem = (props: Props) => {
  const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure();
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();

  return (
    <>
      <AdminEditModal isOpen={isEditModalOpen} onClose={onEditModalClose} admin={props.admin} />
      <AdminDeleteModal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose} admin={props.admin} />
      <Flex p={5} borderRadius={10} alignItems={'center'} backgroundColor={'gray.50'} cursor={'pointer'}>
        {adminItem(props.admin)}
        <Spacer />
        <IconButton onClick={() => undefined} variant={'ghost'} aria-label="See grades" icon={<MdAssignment />} />
        <IconButton onClick={onEditModalOpen} variant={'ghost'} aria-label="Edit admin" icon={<EditIcon />} />
        <IconButton onClick={onDeleteModalOpen} variant={'ghost'} aria-label="Delete admin" icon={<DeleteIcon />} />
      </Flex>
    </>
  );
};

export const adminItem = (
  user: User,
  avatarSize?: string,
  nameSize?: string,
  descriptionSize?: string,
  showBadge?: boolean,
) => {
  return (
    <>
      <HStack>
        <Avatar name={user.firstName + ' ' + user.lastName} size={avatarSize ?? 'sm'} />
        <VStack spacing={0} alignItems={'baseline'}>
          <HStack>
            <Text fontSize={nameSize ?? 'md'}>
              {user.firstName} {user.lastName}
            </Text>
            {showBadge && (
              <Badge colorScheme="purple" fontSize={'xs'}>
                Admin
              </Badge>
            )}
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
  );
};
