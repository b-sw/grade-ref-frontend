import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Team } from 'entities/Team';
import { MdSearch } from 'react-icons/md';
import { TeamListItem } from 'components/admin/teams/TeamListItem';
import { useLeagueTeams } from 'hooks/useLeagueTeams';
import { TeamCreateModal } from 'components/admin/teams/TeamCreateModal';
import { useSetState } from 'hooks/useSetState';
import { teamFilter } from 'components/utils/filters';
import { useEffect } from 'react';
import { NoRecords } from 'components/utils/NoRecords';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface State {
  teams: Team[];
  filter: string;
}

export const TeamsModal = (props: Props) => {
  const { isOpen: isCreateModalOpen, onOpen: onCreateModalOpen, onClose: onCreateModalClose } = useDisclosure();
  const { query: teamsQuery } = useLeagueTeams();

  const [state, setState] = useSetState({
    teams: [],
    filter: '',
  } as State);

  useEffect(() => {
    const filteredTeams: Team[] = teamFilter(teamsQuery.data!, state.filter);
    setState({ teams: filteredTeams });
  }, [state.filter, teamsQuery.data]);

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex direction={'row'}>
            <Text fontWeight={'bold'} fontSize={'2xl'}>
              Teams
            </Text>
            <Spacer />
            <Button variant={'ghost'} leftIcon={<AddIcon />} onClick={onCreateModalOpen}>
              Add
            </Button>
          </Flex>
        </ModalHeader>

        <ModalBody>
          <Flex direction={'column'} h={'70vh'}>
            <TeamCreateModal isOpen={isCreateModalOpen} onClose={onCreateModalClose} />
            <InputGroup>
              <InputLeftElement pointerEvents={'none'} children={<MdSearch />} />
              <Input
                mb={2}
                placeholder={'Search team'}
                onChange={(event) => setState({ filter: event.target.value })}
              />
            </InputGroup>

            <Flex direction={'column'} gap={2} overflowY={'scroll'}>
              {state.teams.length
                ? state.teams.map((team: Team) => <TeamListItem key={team.id} team={team} />)
                : NoRecords()}
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button onClick={props.onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
