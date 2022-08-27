import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Avatar, Flex, HStack, IconButton, Spacer, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { LeagueDeleteModal } from 'components/owner/leagues/LeagueDeleteModal';
import { LeagueEditModal } from 'components/owner/leagues/LeagueEditModal';
import { League } from 'entities/League';

export interface Props {
    league: League;
}

export const LeagueListItem = (props: Props) => {
    const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure();
    const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();

    return (
        <>
            <LeagueEditModal isOpen={isEditModalOpen} onClose={onEditModalClose} league={props.league} />
            <LeagueDeleteModal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose} league={props.league} />
            <Flex p={5} borderRadius={10} alignItems={'center'} backgroundColor={'gray.50'} cursor={'pointer'}>
                {leagueItem(props.league)}
                <Spacer />
                <IconButton onClick={onEditModalOpen} variant={'ghost'} aria-label="Edit league" icon={<EditIcon />} />
                <IconButton
                    onClick={onDeleteModalOpen}
                    variant={'ghost'}
                    aria-label="Delete league"
                    icon={<DeleteIcon />}
                />
            </Flex>
        </>
    );
};

export const leagueItem = (league: League, avatarSize?: string, nameSize?: string, descriptionSize?: string) => {
    return (
        <>
            <HStack>
                <Avatar name={league.name} size={avatarSize ?? 'sm'} />
                <VStack spacing={0} alignItems={'baseline'}>
                    <HStack>
                        <Text fontSize={nameSize ?? 'md'}>{league.name}</Text>
                    </HStack>
                    <VStack alignItems={'baseline'} spacing={0}>
                        <Text fontSize={descriptionSize ?? 'sm'} color={'gray.400'}>
                            {league.shortName}
                        </Text>
                        <Text fontSize={descriptionSize ?? 'sm'} color={'gray.400'}>
                            {league.country}
                        </Text>
                    </VStack>
                </VStack>
            </HStack>
        </>
    );
};
