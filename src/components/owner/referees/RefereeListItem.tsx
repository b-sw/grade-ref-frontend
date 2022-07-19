import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Flex, Spacer, IconButton, VStack, Text, useDisclosure, Avatar, HStack, Badge } from '@chakra-ui/react';
import { MdAssessment } from 'react-icons/md';
import {User} from "entities/User";
import { RefereeDeleteModal } from 'components/owner/referees/RefereeDeleteModal';
import { RefereeEditModal } from 'components/owner/referees/RefereeEditModal';

export interface Props {
  referee: User;
}

export const RefereeListItem = (props: Props) => {
  const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure();
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();

  return (
    <>
      <RefereeEditModal isOpen={isEditModalOpen} onClose={onEditModalClose} referee={props.referee} />
      <RefereeDeleteModal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose} referee={props.referee} />
      <Flex
        p={5}
        borderRadius={10}
        alignItems={'center'}
        backgroundColor={'gray.50'}
        cursor={'pointer'}
      >
        {refereeItem(props.referee)}
        <Spacer />
        <IconButton onClick={() => {}} variant={'ghost'} aria-label='See grades' icon={<MdAssessment />} />
        <IconButton onClick={onEditModalOpen} variant={'ghost'} aria-label='Edit referee' icon={<EditIcon />} />
        <IconButton onClick={onDeleteModalOpen} variant={'ghost'} aria-label='Delete referee' icon={<DeleteIcon />} />
      </Flex>
    </>
  );
}

export const refereeItem = (user: User,
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
            {showBadge && <Badge colorScheme='facebook' fontSize={'xs'}>Referee</Badge>}
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