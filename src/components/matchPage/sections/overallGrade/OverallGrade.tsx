import { EditIcon } from '@chakra-ui/icons';
import { Button, Flex, Icon, Spacer, useDisclosure } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { Constants } from 'utils/Constants';
import { BiDetail } from 'react-icons/bi';
import { TextField } from 'components/matchPage/components/TextField';
import { useStore } from 'zustandStore/store';
import { Role } from 'utils/Role';
import { SectionHeading } from 'components/matchPage/components/SectionHeading';
import { MatchData } from 'components/matchPage/MatchSectionsPanel';
import { Section } from 'components/matchPage/components/Section';
import { SectionBody } from 'components/matchPage/components/SectionBody';
import { OverallGradeEditModal } from 'components/matchPage/sections/overallGrade/OverallGradeEditModal';
import { AutoResizeTextFlex } from 'components/matchPage/components/AutoResizeTextFlex';
import { MatchInfoEnriched } from 'entities/MatchInfoEnriched';

interface OverallGradeProps {
  match: MatchInfoEnriched;
}

export const OverallGrade = ({ match }: OverallGradeProps) => {
  const user = useStore((state) => state.user);
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();

  const getReadableDatetime = (date: Date | undefined, format: string): string => {
    return date ? dayjs(date, Constants.DATETIME_FORMAT).format(format) : 'N/A';
  };

  const overallGradeDate: string = getReadableDatetime(match.overallGradeDate, 'DD-MM-YYYY HH:mm');

  const gradeTextArea: JSX.Element = (
    <Flex>
      <Spacer />
      <AutoResizeTextFlex text={match.overallGrade || 'N/A'} />
      <Spacer />
    </Flex>
  );

  const userCanEdit: boolean = user.role === Role.Admin || user.role === Role.Observer;

  return (
    <>
      {userCanEdit && <OverallGradeEditModal isOpen={isEditOpen} handleClose={onEditClose} match={match} />}
      <Section>
        <SectionHeading title={MatchData.OverallGrade} icon={<Icon as={BiDetail} boxSize={25} />}>
          <Button variant={'ghost'} leftIcon={<Icon as={EditIcon} />} onClick={onEditOpen} disabled={!userCanEdit}>
            Edit
          </Button>
        </SectionHeading>

        <SectionBody>
          <Flex direction={'column'} gap={2}>
            {gradeTextArea}
            <TextField name={'Description date:'} text={overallGradeDate} />
          </Flex>
        </SectionBody>
      </Section>
    </>
  );
};
