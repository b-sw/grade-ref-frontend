import {Match} from "../../entities/Match";
import {User} from "../../entities/User";
import {Avatar, Badge, Flex, HStack, Text, VStack} from "@chakra-ui/react";
import {Constants} from "../../shared/Constants";
import dayjs from "dayjs";
import {CalendarIcon} from "@chakra-ui/icons";
import {BsClockFill} from "react-icons/bs";
import {determineGradeStatus} from "./gradeStatus";
import {Role} from "../../shared/Role";

interface Props {
  match: Match;
  user: User;
}

export const MatchGradeListItem = (props: Props) => {

  return (
    <>
      <Flex
        p={5}
        borderRadius={10}
        alignItems={'center'}
        backgroundColor={'gray.50'}
      >
        {matchGradeItem(props.match, props.user)}
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
  const { badgeColor, badgeString } = getUserBadge(user);

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

const getUserBadge = (user: User): { badgeColor: string, badgeString: string } => {
  if (user.role === Role.Referee) {
    return { badgeColor: 'facebook', badgeString: 'Referee' };
  } else {
    return { badgeColor: 'purple', badgeString: 'Observer' };
  }
}