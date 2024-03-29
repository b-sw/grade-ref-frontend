import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Avatar, Flex, HStack, IconButton, Spacer, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { Team } from 'entities/Team';
import { TeamDeleteModal } from 'components/admin/teams/TeamDeleteModal';
import { TeamEditModal } from 'components/admin/teams/TeamEditModal';

export interface Props {
    team: Team;
}

export const TeamListItem = (props: Props) => {
    const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure();
    const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();

    return (
        <>
            <TeamEditModal isOpen={isEditModalOpen} onClose={onEditModalClose} team={props.team} />
            <TeamDeleteModal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose} team={props.team} />
            <Flex p={5} borderRadius={10} alignItems={'center'} backgroundColor={'gray.50'}>
                {teamItem(props.team)}
                <Spacer />
                <IconButton onClick={onEditModalOpen} variant={'ghost'} aria-label="Edit team" icon={<EditIcon />} />
                <IconButton
                    onClick={onDeleteModalOpen}
                    variant={'ghost'}
                    aria-label="Delete team"
                    icon={<DeleteIcon />}
                />
            </Flex>
        </>
    );
};

export const teamItem = (team: Team) => {
    return (
        <>
            <HStack>
                <Avatar name={team.name} size={'sm'} />
                <VStack spacing={0} alignItems={'baseline'}>
                    <Text>{team.name}</Text>
                </VStack>
            </HStack>
        </>
    );
};
