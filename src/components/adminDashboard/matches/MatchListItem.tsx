import { Flex, Text, Spacer, IconButton } from '@chakra-ui/react';
import {Match} from "entities/Match";
import {useLeagueTeams} from "hooks/useLeagueTeams";
import {Team} from "entities/Team";
import dayjs from 'dayjs';
import { CalendarIcon } from '@chakra-ui/icons';
import {Constants} from "utils/Constants";
import { BsArrowRight } from 'react-icons/bs';
import { GiSoccerField } from "react-icons/gi";
import { motion } from 'framer-motion';
import {Path} from "utils/Path";
import {NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import {uuid} from "utils/uuid";

export interface Props {
  match: Match;
  readOnly?: boolean;
}

export const MatchListItem = (props: Props) => {
  const { query: teamsQuery } = useLeagueTeams();
  const navigate: NavigateFunction = useNavigate();
  const { leagueId } = useParams<{ leagueId: uuid }>();

  return (
    <>
      <Flex
        p={5}
        borderRadius={10}
        alignItems={'center'}
        backgroundColor={'gray.50'}
        cursor={props.readOnly ? 'default' : 'pointer'}
        onClick={props.readOnly ? () => {} : () => { navigate(`${Path.MATCH_PAGE}/${leagueId}/match/${props.match.id}`); }}
        w={'100%'}
      >
        {matchItem(props.match, teamsQuery.data!, navigate, leagueId!, props.readOnly)}
      </Flex>
    </>
  );
}

export const matchItem = (match: Match, teams: Team[], navigate: NavigateFunction, leagueId: uuid, readOnly?: boolean) => {
  const homeTeam: Team = teams.find((team: Team) => team.id === match.homeTeamId)!;
  const awayTeam: Team = teams.find((team: Team) => team.id === match.awayTeamId)!;
  const matchDate: string = dayjs(match.matchDate, Constants.DATETIME_FORMAT).format('DD-MM-YYYY');
  const matchTime: string = dayjs(match.matchDate, Constants.DATETIME_FORMAT).format('HH:mm');

  return (
    <Flex direction={'row'} w={'100%'} alignItems={'center'}>
      <Flex w={'50%'}>
        <Flex w={'40%'}>
          <Spacer />
          <Text fontWeight={'medium'}>{homeTeam.name}</Text>
        </Flex>

        <Flex w={'20%'}>
          <Spacer />
          {timeItem(matchTime)}
          <Spacer />
        </Flex>

        <Flex w={'40%'}>
          <Text fontWeight={'medium'}>{awayTeam.name}</Text>
          <Spacer />
        </Flex>
      </Flex>

      <Spacer />

      <Flex direction={'row'} w={'30%'} alignItems={'center'} >
        <GiSoccerField />
        <Text fontSize={'sm'} ml={1}>{match.stadium}</Text>
      </Flex>

      <Spacer />

      <Flex direction={'row'} w={'15%'} alignItems={'center'}>
        <CalendarIcon />
        <Text fontSize={'sm'} ml={1}>{matchDate}</Text>
      </Flex>

      <Flex direction={'row'} w={'5%'}>
        {!readOnly &&
          <IconButton
            as={motion.div}
            onClick={() => { navigate(`${Path.MATCH_PAGE}/${leagueId}/match/${match.id}`); }}
            variant={'ghost'}
            aria-label='match-details'
            whileHover={{ left: 5 }}
            icon={
              <BsArrowRight />
            }
          />
        }
      </Flex>
    </Flex>
  )
}

export const timeItem = (time: string) => {
  return (
    <Flex
      direction={'column'}
      borderRadius={5}
      borderWidth={1}
      px={1}
      borderColor={'gray.300'}
    >
      <Spacer />
      <Text fontWeight={'light'}>{time}</Text>
      <Spacer />
    </Flex>
  );
}