import { HStack, VStack, Text, Badge } from "@chakra-ui/react";
import { MdHistory, MdInsertChart } from "react-icons/md";
import {Match} from "../../entities/Match";
import { CalendarIcon } from '@chakra-ui/icons';
import {Constants} from "../../shared/Constants";
import dayjs from "dayjs";

interface Props {
  matches: Match[],
}

export const MatchGradeSummaryHeader = (props: Props) => {
  const gradedMatches: Match[] = props.matches.filter((match) => match.refereeGradeDate);
  const recentMatches: (Match | undefined)[] = Array.from({ ...gradedMatches, length: 4 });
  return (
    <HStack
      p={3}
      mb={3}
      // alignItems={'center'}
      w={'100%'}
    >
      <VStack alignItems={'baseline'} w={'10%'}>
        <MdHistory size={'50'}/>
      </VStack>
      {recentMatches.map((match, idx) => (
        <VStack alignItems={'baseline'} key={'recentMatch-' + idx} w={'22.5%'}>
          <HStack>
            <CalendarIcon />
            <Text>{match ? dayjs(match.refereeGradeDate, Constants.DATETIME_FORMAT).format('DD-MM-YYYY') : "N/A"}</Text>
          </HStack>
          <HStack>
            <MdInsertChart />
            <Badge variant={'outline'} colorScheme={match ? 'green' : 'gray' } fontSize={'xs'}>{match ? match.refereeGrade : 'N/A'}</Badge>
          </HStack>
        </VStack>
      ))}
    </HStack>
  )
}