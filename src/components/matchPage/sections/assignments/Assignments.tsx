import { Button, Flex, Icon, useDisclosure } from '@chakra-ui/react';
import { MdPeople } from 'react-icons/md';
import { EditIcon } from '@chakra-ui/icons';
import { MatchData } from 'components/matchPage/MatchSectionsPanel';
import { AssignmentEditModal } from 'components/matchPage/sections/assignments/AssignmentEditModal';
import { TextField } from 'components/matchPage/components/TextField';
import { Role } from 'utils/Role';
import dayjs from 'dayjs';
import { useStore } from 'zustandStore/store';
import { SectionHeading } from 'components/matchPage/components/SectionHeading';
import { Section } from 'components/matchPage/components/Section';
import { SectionBody } from 'components/matchPage/components/SectionBody';
import { useMatch } from 'hooks/useMatch';
import { MatchInfoEnriched } from 'entities/MatchInfoEnriched';

interface AssignmentsProps {
  match: MatchInfoEnriched;
}

export const Assignments = ({ match }: AssignmentsProps) => {
  const { query: matchQuery } = useMatch();
  const user = useStore((state) => state.user);
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();

  const handleOpenEditModal = async () => {
    await matchQuery.refetch();
    onEditOpen();
  };

  const matchHasStarted: boolean = dayjs(match.matchDate).isBefore(dayjs());
  const userIsAdmin: boolean = user.role === Role.Admin;
  const userCanEdit: boolean = userIsAdmin && !matchHasStarted;

  return (
    <>
      {userCanEdit && <AssignmentEditModal isOpen={isEditOpen} handleClose={onEditClose} />}

      <Section>
        <SectionHeading title={MatchData.Assignments} icon={<Icon as={MdPeople} boxSize={'25'} />}>
          <Button
            variant={'ghost'}
            leftIcon={<Icon as={EditIcon} />}
            onClick={handleOpenEditModal}
            disabled={!userCanEdit}
            isLoading={matchQuery.isLoading}
          >
            Edit
          </Button>
        </SectionHeading>

        <SectionBody>
          <Flex direction={'column'} pr={[0, 20]} gap={2}>
            <TextField name={'Referee:'} text={match.referee} />
            <TextField name={'Observer:'} text={match.observer} />
          </Flex>
        </SectionBody>
      </Section>
    </>
  );
};
