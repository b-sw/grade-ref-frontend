import { Button, Flex, Icon, Spacer, Textarea, useDisclosure } from "@chakra-ui/react"
import { Match } from "entities/Match";
import { MatchData } from "components/shared/match/MatchOverviewPanel";
import { MdNote } from "react-icons/md";
import { EditIcon } from "@chakra-ui/icons";
import { useStore } from "zustandStore/store";
import { Role } from "utils/Role";
import { SectionHeading } from "components/shared/match/components/SectionHeading";
import { SectionBody } from 'components/shared/match/components/SectionBody';
import { Section } from 'components/shared/match/components/Section';
import { RefereeNoteEditModal } from 'components/shared/match/sections/note/modals/RefereeNoteEditModal';

interface RefereeNoteProps {
  match: Match;
}

export const RefereeNote = ({ match }: RefereeNoteProps) => {
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();

  const user = useStore((state) => state.user);

  const userCanEdit: boolean = user.role === Role.Referee || user.role === Role.Admin;

  return (
    <>
      {userCanEdit && <RefereeNoteEditModal isOpen={isEditOpen} handleClose={onEditClose} match={match} />}
      <Section>
        <SectionHeading title={MatchData.RefereeNote} icon={<Icon as={MdNote} boxSize={25}/>}>
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
          <Flex>
            <Spacer />
            <Textarea
              w={['100%', '50%']}
              isReadOnly={true}
              resize={'none'}
              value={match.refereeNote ?? 'N/A'}
              borderColor={'gray.400'}
              focusBorderColor={'gray.400'}
              backgroundColor={'gray.100'}
              _hover={{}}
            />
            <Spacer />
          </Flex>
        </SectionBody>
      </Section>
    </>
  );
}