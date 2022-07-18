import { EditIcon, WarningIcon } from "@chakra-ui/icons";
import { Badge, Button, Flex, HStack, Icon, Text, Textarea, Tooltip, useDisclosure } from "@chakra-ui/react";
import dayjs from "dayjs";
import { Match } from "entities/Match";
import { Constants } from "utils/Constants";
import { BiDetail } from "react-icons/bi";
import { TextField } from "components/shared/match/components/TextField";
import { Field } from "components/shared/match/components/Field";
import { GradeEditModal } from "components/shared/match/sections/grade/GradeEditModal";
import { useStore } from "zustandStore/store";
import { Role } from "utils/Role";
import { SectionHeading } from "components/shared/match/components/SectionHeading";
import { MatchData } from "components/shared/match/MatchOverviewPanel";

interface GradeProps {
  match: Match;
}

export const Grade = ({ match }: GradeProps) => {
  const user = useStore(state => state.user);
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();

  const getReadableDatetime = (date: Date, format: string): string => {
    return date ? dayjs(date, Constants.DATETIME_FORMAT).format(format) : 'N/A';
  }

  const refereeGradeDate: string = getReadableDatetime(match.refereeGradeDate, 'DD-MM-YYYY HH:mm');
  const overallGradeDate: string = getReadableDatetime(match.overallGradeDate, 'DD-MM-YYYY HH:mm');

  const gradeBadge: JSX.Element = (
    <Flex align={'center'}>
      <Badge variant={'outline'} colorScheme={match.gradeStatus.badgeScheme} fontSize={'md'} w={'auto'}>
        {match.refereeGrade ?? 'N/A'}
      </Badge>
    </Flex>
  );

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

  const gradeDate: JSX.Element = (
    <Flex gap={2}>
      <Text fontSize={'xl'} fontWeight={'medium'}>{refereeGradeDate}</Text>
      {match.gradeStatus.delay &&
        <HStack>
          <Tooltip label='delay'>
            <Icon as={WarningIcon} color={'red.600'}/>
          </Tooltip>
          <Text color={'red.600'}>+{match.gradeStatus.delay}</Text>
        </HStack>
      }
    </Flex>
  );

  const userCanEdit: boolean = user.role === Role.Admin || user.role === Role.Observer;

  return (
    <>
      {userCanEdit && <GradeEditModal isOpen={isEditOpen} handleClose={onEditClose} match={match} />}
      <Flex direction={'column'} w={'100%'} mb={5} gap={2}>
        <SectionHeading title={MatchData.Grade} icon={<Icon as={BiDetail} boxSize={25} />}>
          <Button
            variant={'ghost'}
            leftIcon={<Icon as={EditIcon} />}
            onClick={onEditOpen}
            disabled={!userCanEdit}
          >
            Edit
          </Button>
        </SectionHeading>

        <Flex
          direction={'column'}
          w={'100%'}
          borderRadius={10}
          backgroundColor={'gray.200'}
          p={5}
        >
          <Flex direction={'column'} pr={[0, 20]} gap={2}>

            <Field name={'grade'} element={gradeBadge} />
            <Field name={'grade date'} element={gradeDate} />
            <Field name={'overall grade'} element={gradeTextArea} />
            <TextField name={'overall grade date'} text={overallGradeDate} />

          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
