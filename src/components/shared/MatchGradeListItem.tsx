import {Match} from "../../entities/Match";
import {User} from "../../entities/User";
import {Avatar, Badge, Flex, HStack, IconButton, Spacer, Text, useDisclosure, VStack} from "@chakra-ui/react";
import {Constants} from "../../shared/Constants";
import dayjs from "dayjs";
import {CalendarIcon, EditIcon} from "@chakra-ui/icons";
import {BsClockFill} from "react-icons/bs";
import {determineGradeStatus} from "./gradeStatus";
import {Role} from "../../shared/Role";
import { GradeEditModal } from "../dashboard/grades/GradeEditModal";

interface Props {
  match: Match;
  user: User;
  readOnly?: boolean;
}

export const MatchGradeListItem = (props: Props) => {
  const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure();

  return (
    <>
      {!props.readOnly && <GradeEditModal isOpen={isEditModalOpen} onClose={onEditModalClose} match={props.match} />}
      <Flex
        p={5}
        borderRadius={10}
        alignItems={'center'}
        backgroundColor={'gray.50'}
      >
        {matchGradeItem(props.match, props.user)}
        {!props.readOnly &&
          <>
            <Spacer />
            <IconButton onClick={onEditModalOpen} variant={'ghost'} aria-label='Edit grade' icon={<EditIcon />} />
          </>
        }
      </Flex>
    </>
  );
}

export const matchGradeItem = (match: Match, user: User) => {
  let gradeDate: string = 'TBD';
  let gradeTime: string = 'TBD';
  if (match.refereeGradeDate) {
    gradeDate = dayjs(match.refereeGradeDate, Constants.DATETIME_FORMAT).format('DD-MM-YYYY');
    gradeTime = dayjs(match.refereeGradeDate, Constants.DATETIME_FORMAT).format('HH:mm');
  }
  const { gradeStatus, gradeBadgeScheme } = determineGradeStatus(match);
  const { badgeColor, badgeString } = getUserBadge(user.role);

  return (
    <>
      <VStack w={'100%'} align={'left'}>
        <Text fontSize={'sm'}><b>Match #{match.userReadableKey}</b></Text>
        <HStack w={'100%'}>
          <HStack w={'40%'}>
            <Avatar
              name={user.firstName + ' ' + user.lastName}
              size={'sm'}
            />
            <VStack spacing={0} alignItems={'baseline'}>
              <HStack>
                <Text fontSize={'sm'}>{user.firstName} {user.lastName}</Text>
                <Badge colorScheme={badgeColor} fontSize={'xs'}>{badgeString}</Badge>
              </HStack>
              <VStack alignItems={'baseline'} spacing={0}>
                <Text fontSize={'xs'} color={'gray.400'}>
                  {user.email}
                </Text>
                <Text fontSize={'xs'} color={'gray.400'}>
                  {user.phoneNumber}
                </Text>
              </VStack>
            </VStack>
          </HStack>

          <VStack alignItems={'baseline'} w={'30%'}>
            <HStack>
              <Text>Status:</Text>
              <Badge colorScheme={gradeBadgeScheme} fontSize={'xs'}>{gradeStatus}</Badge>
            </HStack>
            <HStack>
              <Text>Grade:</Text>
              <Badge variant={'outline'} colorScheme={gradeBadgeScheme} fontSize={'xs'}>{match.refereeGrade ?? 'N/A'}</Badge>
            </HStack>
          </VStack>

          <VStack alignItems={'baseline'} w={'30%'}>
            <HStack>
              <CalendarIcon />
              <Text fontSize={'sm'}>{gradeDate}</Text>
            </HStack>
            <HStack>
              <BsClockFill />
              <Text fontSize={'sm'}>{gradeTime}</Text>
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    </>
  );
}

export const getUserBadge = (userRole: Role): { badgeColor: string, badgeString: string } => {
  if (userRole === Role.Referee) {
    return { badgeColor: 'facebook', badgeString: 'Referee' };
  }

  if (userRole === Role.Observer) {
    return { badgeColor: 'purple', badgeString: 'Observer' };
  }

  if (userRole === Role.Admin) {
    return { badgeColor: 'orange', badgeString: 'League admin' };
  }

  return { badgeColor: 'linkedin', badgeString: 'Owner' };
}