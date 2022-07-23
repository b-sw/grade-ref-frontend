import { EditIcon } from "@chakra-ui/icons";
import { Button, Flex, Icon, Textarea, useDisclosure } from "@chakra-ui/react";
import dayjs from "dayjs";
import { Match } from "entities/Match";
import { Constants } from "utils/Constants";
import { BiDetail } from "react-icons/bi";
import { TextField } from "components/matchPage/components/TextField";
import { Field } from "components/matchPage/components/Field";
import { useStore } from "zustandStore/store";
import { Role } from "utils/Role";
import { SectionHeading } from "components/matchPage/components/SectionHeading";
import { MatchData } from "components/matchPage/MatchSectionsPanel";
import { Section } from 'components/matchPage/components/Section';
import { SectionBody } from 'components/matchPage/components/SectionBody';
import { OverallGradeEditModal } from 'components/matchPage/sections/overallGrade/OverallGradeEditModal';

interface OverallGradeProps {
  match: Match;
}

export const OverallGrade = ({ match }: OverallGradeProps) => {
  const user = useStore(state => state.user);
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();

  const getReadableDatetime = (date: Date, format: string): string => {
    return date ? dayjs(date, Constants.DATETIME_FORMAT).format(format) : 'N/A';
  }

  const overallGradeDate: string = getReadableDatetime(match.overallGradeDate, 'DD-MM-YYYY HH:mm');

  const gradeTextArea: JSX.Element = (
    <Textarea
      isReadOnly={true}
      resize={'none'}
      value={match.overallGrade ?? 'N/A'}
      borderColor={'gray.400'}
      focusBorderColor={'gray.400'}
      backgroundColor={'gray.100'}
      _hover={{}}
    />
  );

  const userCanEdit: boolean = user.role === Role.Admin || user.role === Role.Observer;

  return (
    <>
      {userCanEdit && <OverallGradeEditModal isOpen={isEditOpen} handleClose={onEditClose} match={match} />}
      <Section>
        <SectionHeading title={MatchData.OverallGrade} icon={<Icon as={BiDetail} boxSize={25} />}>
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

            <Field name={'overall grade'} element={gradeTextArea} />
            <TextField name={'overall grade date'} text={overallGradeDate} />

          </Flex>
        </SectionBody>
      </Section>
    </>
  );
}
