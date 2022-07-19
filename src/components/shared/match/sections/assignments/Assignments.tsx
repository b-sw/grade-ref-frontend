import {User} from "entities/User";
import {Match} from "entities/Match";
import {Button, Flex, Icon, useDisclosure} from "@chakra-ui/react";
import { MdPeople } from "react-icons/md";
import { EditIcon } from "@chakra-ui/icons";
import {MatchData} from "components/shared/match/MatchOverviewPanel";
import {AssignmentEditModal} from "components/shared/match/sections/assignments/modals/AssignmentEditModal";
import {TextField} from "components/shared/match/components/TextField";
import {Role} from "utils/Role";
import dayjs from "dayjs";
import {useStore} from "zustandStore/store";
import { SectionHeading } from "components/shared/match/components/SectionHeading";
import { Section } from 'components/shared/match/components/Section';
import { SectionBody } from 'components/shared/match/components/SectionBody';

interface AssignmentsProps {
  match: Match;
  referee: User;
  observer: User;
}

export const Assignments = ({ match, referee, observer }: AssignmentsProps) => {
  const user = useStore((state) => state.user);
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();

  const matchHasStarted: boolean = dayjs(match.matchDate).isBefore(dayjs());
  const userIsAdmin: boolean = user.role === Role.Admin;
  const userCanEdit: boolean = userIsAdmin && !matchHasStarted;

  return (
    <>
      {userCanEdit && <AssignmentEditModal isOpen={isEditOpen} handleClose={onEditClose} match={match} />}

      <Section>
        <SectionHeading title={MatchData.Assignments} icon={<Icon as={MdPeople} boxSize={'25'} />}>
          <Button
            variant={'ghost'}
            leftIcon={<Icon as={EditIcon} />}
            onClick={onEditOpen}
            disabled={!userCanEdit}
          >
            Edit
          </Button>
        </SectionHeading>

        <SectionBody>
          <Flex direction={'column'} pr={[0, 20]} gap={2}>
            <TextField name={'referee'} text={[referee.firstName, referee.lastName].join(' ')} />
            <TextField name={'observer'} text={[observer.firstName, observer.lastName].join(' ')} />
          </Flex>
        </SectionBody>
      </Section>
    </>
  );
}