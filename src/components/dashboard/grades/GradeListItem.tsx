import { GRADE_ADMISSION_TIME_WINDOW, MATCH_DURATION_TIME } from 'entities/Match';
import {
  Avatar,
  Badge,
  Flex,
  HStack,
  IconButton,
  Spacer,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { Constants } from 'utils/Constants';
import dayjs from 'dayjs';
import { CalendarIcon, EditIcon, WarningIcon } from '@chakra-ui/icons';
import { BsClockFill } from 'react-icons/bs';
import { Role } from 'utils/Role';
import { GradeEditModal } from 'components/matchPage/sections/grade/GradeEditModal';
import { MatchInfoEnriched } from 'entities/MatchInfoEnriched';
import { TFunction, useTranslation } from 'react-i18next';

interface GradeListItemProps {
  match: MatchInfoEnriched;
  userFullName: string;
  userRole: Role;
  readOnly?: boolean;
}

export const GradeListItem = ({ match, userFullName, userRole, readOnly }: GradeListItemProps) => {
  const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure();
  const { t } = useTranslation();

  const enableEdit: boolean = (!isPastAdmissionWindow(match) || !match.refereeGrade) && !isUpcoming(match);

  return (
    <>
      {!readOnly && <GradeEditModal isOpen={isEditModalOpen} handleClose={onEditModalClose} match={match} />}
      <Flex p={5} borderRadius={10} alignItems={'center'} backgroundColor={'gray.50'}>
        {matchGradeItem(match, userFullName, userRole, t)}
        <Spacer />
        {!readOnly && (
          <IconButton
            onClick={onEditModalOpen}
            disabled={!enableEdit}
            variant={'ghost'}
            aria-label="Edit grade"
            icon={<EditIcon />}
          />
        )}
      </Flex>
    </>
  );
};

export const isPastAdmissionWindow = (match: MatchInfoEnriched): boolean => {
  return dayjs(match.matchDate).add(GRADE_ADMISSION_TIME_WINDOW, 'hour').isBefore(dayjs());
};

export const isUpcoming = (match: MatchInfoEnriched): boolean => {
  return dayjs(match.matchDate).add(MATCH_DURATION_TIME, 'hour').isAfter(dayjs());
};

export const matchGradeItem = (
  match: MatchInfoEnriched,
  userFullName: string,
  userRole: Role,
  t: TFunction<'translation', undefined>,
) => {
  let gradeDate = 'TBD';
  let gradeTime = 'TBD';
  if (match.refereeGradeDate) {
    gradeDate = dayjs(match.refereeGradeDate, Constants.DATETIME_FORMAT).format('DD-MM-YYYY');
    gradeTime = dayjs(match.refereeGradeDate, Constants.DATETIME_FORMAT).format('HH:mm');
  }
  const { badgeColor, badgeString } = getUserBadge(userRole, t);

  return (
    <>
      <VStack w={'100%'} align={'left'}>
        <Text fontSize={'sm'}>
          <b>
            {t('match')} #{match.userReadableKey}
          </b>
        </Text>
        <Flex direction={['column', 'row']} gap={2}>
          <HStack w={['100$', '40%']}>
            <Avatar name={userFullName} size={'sm'} />
            <VStack spacing={0} alignItems={'baseline'}>
              <HStack>
                <Text fontSize={'sm'}>{userFullName}</Text>
                <Badge colorScheme={badgeColor} fontSize={'xs'}>
                  {badgeString}
                </Badge>
              </HStack>
            </VStack>
          </HStack>

          <VStack alignItems={'baseline'} w={['100$', '30%']}>
            <HStack>
              <Text>{t('matches.status')}:</Text>
              <Badge colorScheme={match.gradeStatus.badgeScheme} fontSize={'xs'}>
                {match.gradeStatus.status}
              </Badge>
            </HStack>
            <HStack>
              <Text>{t('grade')}:</Text>
              <Badge variant={'outline'} colorScheme={match.gradeStatus.badgeScheme} fontSize={'xs'}>
                {match.refereeGrade ?? 'N/A'}
              </Badge>
            </HStack>
          </VStack>

          <VStack alignItems={'baseline'} w={['100$', '30%']}>
            <HStack>
              <CalendarIcon />
              <Text fontSize={'sm'}>{gradeDate}</Text>
            </HStack>
            <HStack>
              <BsClockFill />
              <Text fontSize={'sm'}>{gradeTime}</Text>
              {match.gradeStatus.delay && (
                <Tooltip label={'+' + match.gradeStatus.delay}>
                  <WarningIcon color={'red.600'} />
                </Tooltip>
              )}
            </HStack>
          </VStack>
        </Flex>
      </VStack>
    </>
  );
};

export const getUserBadge = (
  userRole: Role,
  t: TFunction<'translation', undefined>,
): { badgeColor: string; badgeString: string } => {
  if (userRole === Role.Referee) {
    return { badgeColor: 'facebook', badgeString: t('referee') };
  }

  if (userRole === Role.Observer) {
    return { badgeColor: 'purple', badgeString: t('observer') };
  }

  if (userRole === Role.Admin) {
    return { badgeColor: 'orange', badgeString: t('leagueAdmin') };
  }

  return { badgeColor: 'linkedin', badgeString: t('owner') };
};
