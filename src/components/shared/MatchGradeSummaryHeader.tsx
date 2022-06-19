import { HStack, VStack, Text, Badge } from "@chakra-ui/react";
import { MdHistory, MdInsertChart } from "react-icons/md";
import {Match} from "../../entities/Match";
import { CalendarIcon } from '@chakra-ui/icons';
import {Constants} from "../../shared/Constants";
import dayjs from "dayjs";
import {useMobile} from "../../hooks/useMobile";

interface Props {
  matches: Match[],
}

export const MatchGradeSummaryHeader = (props: Props) => {
  const { isMobile } = useMobile();

  const gradedMatches: Match[] = props.matches.filter((match) => match.refereeGradeDate);
  const historyLength: number = isMobile ? 2 : 4;
  const recentMatches: (Match | undefined)[] = Array.from({ ...gradedMatches, length: historyLength });

  return (
    <HStack
      p={3}
      mb={3}
      w={'100%'}
    >
      <VStack alignItems={'center'} w={'10%'}>
        <MdHistory size={isMobile ? '20' : '30'}/>
        <Text fontSize={'xs'}>Recent</Text>
      </VStack>
      {recentMatches.map((match, idx) => (
        <VStack alignItems={'baseline'} key={'recentMatch-' + idx} w={(90 / historyLength).toString() + '%'}>
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