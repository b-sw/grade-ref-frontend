import { HStack, VStack, Text, Badge } from "@chakra-ui/react";
import { MdHistory, MdInsertChart } from "react-icons/md";
import {Match} from "../../entities/Match";
import { CalendarIcon } from '@chakra-ui/icons';
import {Constants} from "../../shared/Constants";
import dayjs from "dayjs";
import {useSetState} from "../../hooks/useSetState";
import {MOBILE_WINDOW_WIDTH} from "../landingPage/Hero";
import { useEffect } from "react";

interface Props {
  matches: Match[],
}

interface State {
  isMobile: boolean;
}

export const MatchGradeSummaryHeader = (props: Props) => {
  const [state, setState] = useSetState({
    isMobile: window.innerWidth < MOBILE_WINDOW_WIDTH
  } as State);

  const gradedMatches: Match[] = props.matches.filter((match) => match.refereeGradeDate);
  const historyLength: number = state.isMobile ? 2 : 4;
  const recentMatches: (Match | undefined)[] = Array.from({ ...gradedMatches, length: historyLength });

  useEffect(() => {
    window.addEventListener('resize', () => setState({ isMobile: window.innerWidth < MOBILE_WINDOW_WIDTH }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HStack
      p={3}
      mb={3}
      w={'100%'}
    >
      <VStack alignItems={'baseline'} w={'10%'}>
        <MdHistory size={state.isMobile ? '30' : '40'}/>
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