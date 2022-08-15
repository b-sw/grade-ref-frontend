import { Button, Flex, Icon, useDisclosure } from '@chakra-ui/react';
import { MdPeople } from 'react-icons/md';
import { EditIcon } from '@chakra-ui/icons';
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
import { useTranslation } from 'react-i18next';

interface AssignmentsProps {
  match: MatchInfoEnriched;
}

export const Assignments = ({ match }: AssignmentsProps) => {
  const { query: matchQuery } = useMatch();
  const user = useStore((state) => state.user);
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { t } = useTranslation();

  const handleOpenEditModal = async () => {
    await matchQuery.refetch();
    onEditOpen();
  };

  const matchHasStarted: boolean = dayjs(match.matchDate).isBefore(dayjs());
  const userIsAdmin: boolean = user.role === Role.Admin;
  const userCanEdit: boolean = userIsAdmin && !matchHasStarted;

  const hiddenObserver = match.observer === 'hidden' ? t('matchPage.assignments.hidden') : undefined;

  return (
    <>
      {userCanEdit && matchQuery.data && <AssignmentEditModal isOpen={isEditOpen} handleClose={onEditClose} />}

      <Section>
        <SectionHeading title={t('matchPage.assignments.title')} icon={<Icon as={MdPeople} boxSize={'25'} />}>
          <Button
            variant={'ghost'}
            leftIcon={<Icon as={EditIcon} />}
            onClick={handleOpenEditModal}
            disabled={!userCanEdit}
            isLoading={matchQuery.isLoading}
          >
            {t('modal.edit')}
          </Button>
        </SectionHeading>

        <SectionBody>
          <Flex direction={'column'} pr={[0, 20]} gap={2}>
            <TextField name={t('referee') + ':'} text={match.referee} />
            <TextField name={t('observer') + ':'} text={hiddenObserver ?? match.observer} />
          </Flex>
        </SectionBody>
      </Section>
    </>
  );
};
