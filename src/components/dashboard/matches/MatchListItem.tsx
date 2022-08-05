import { Flex, IconButton, Spacer, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { ArrowRightIcon, CalendarIcon, Icon } from '@chakra-ui/icons';
import { Constants } from 'utils/Constants';
import { BsArrowRight, BsArrowRightShort } from 'react-icons/bs';
import { GiSoccerField } from 'react-icons/gi';
import { motion } from 'framer-motion';
import { Path } from 'utils/Path';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { uuid } from 'utils/uuid';
import { MatchInfoEnriched } from 'entities/MatchInfoEnriched';
import { useLeagueTeams } from 'hooks/useLeagueTeams';
import { Team } from 'entities/Team';
import { Button } from '@chakra-ui/react';

export interface MatchListItemProps {
  match: MatchInfoEnriched;
  readOnly?: boolean;
}

export const MatchListItem = ({ match, readOnly }: MatchListItemProps) => {
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
        cursor={readOnly ? 'default' : 'pointer'}
        onClick={
          readOnly
            ? () => undefined
            : () => {
                navigate(`${Path.MATCH_PAGE}/${leagueId}/match/${match.id}`);
              }
        }
        w={'100%'}
      >
        {matchItem(match, teamsQuery.data!, navigate, leagueId!, readOnly)}
      </Flex>
    </>
  );
};

export const matchItem = (
  match: MatchInfoEnriched,
  teams: Team[],
  navigate: NavigateFunction,
  leagueId: uuid,
  readOnly?: boolean,
) => {
  const homeTeam = teams.find((team) => team.id === match.homeTeamId)!;
  const awayTeam = teams.find((team) => team.id === match.awayTeamId)!;
  const matchDate = dayjs(match.matchDate, Constants.DATETIME_FORMAT).format('DD-MM-YYYY');
  const matchTime = dayjs(match.matchDate, Constants.DATETIME_FORMAT).format('HH:mm');

  const firstButtonVariants = {
    hover: { x: 3, transition: { ease: 'easeOut', duration: 0.1 } },
  };
  const secondButtonVariants = {
    hidden: { x: -30, opacity: 0, transition: { ease: 'easeOut', duration: 0.2 } },
    hover: { x: 0, opacity: 1, transition: { ease: 'easeOut', duration: 0.2 } },
  };
  const thirdButtonVariants = {
    hidden: { x: 0, opacity: 1, transition: { ease: 'easeOut', duration: 0.2 } },
    hover: { x: 30, opacity: 0, transition: { ease: 'easeOut', duration: 0.2 } },
  };

  return (
    <Flex direction={'row'} w={'100%'} alignItems={'center'}>
      <Flex w={'50%'}>
        <Flex w={'40%'}>
          <Spacer />
          <Flex direction={'column'}>
            <Spacer />
            <Text fontWeight={'medium'}>{homeTeam.name}</Text>
            <Spacer />
          </Flex>
        </Flex>

        <Flex w={'20%'}>
          <Spacer />
          <Flex direction={'column'}>
            <Spacer />
            {timeItem(matchTime)}
            <Spacer />
          </Flex>
          <Spacer />
        </Flex>

        <Flex w={'40%'}>
          <Flex direction={'column'}>
            <Spacer />
            <Text fontWeight={'medium'}>{awayTeam.name}</Text>
            <Spacer />
          </Flex>
          <Spacer />
        </Flex>
      </Flex>

      <Spacer />

      <Flex direction={'row'} w={'30%'} alignItems={'center'}>
        <GiSoccerField />
        <Text fontSize={'sm'} ml={1}>
          {match.stadium}
        </Text>
      </Flex>

      <Spacer />

      <Flex direction={'row'} w={'15%'} alignItems={'center'}>
        <CalendarIcon />
        <Text fontSize={'sm'} ml={1}>
          {matchDate}
        </Text>
      </Flex>

      <Flex direction={'row'} w={'5%'}>
        {!readOnly && (
          <Button
            as={motion.div}
            onClick={() => {
              navigate(`${Path.MATCH_PAGE}/${leagueId}/match/${match.id}`);
            }}
            variant={'ghost'}
            aria-label="match-details"
            whileHover={'hover'}
            initial={'hidden'}
            overflow={'hidden'}
          >
            {/* first */}
            {/* <Flex as={motion.div} initial={{ x: -3 }} variants={secondButtonVariants}>
              <Icon as={BsArrowRight} />
            </Flex> */}

            {/* second */}
            <Flex as={motion.div} variants={secondButtonVariants} position={'absolute'}>
              <Icon as={BsArrowRight} />
            </Flex>
            <Flex as={motion.div} variants={thirdButtonVariants} position={'absolute'}>
              <Icon as={BsArrowRightShort} />
            </Flex>
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export const timeItem = (time: string) => {
  return (
    <Flex direction={'column'} borderRadius={5} borderWidth={1} px={1} borderColor={'gray.300'}>
      <Text fontWeight={'light'}>{time}</Text>
    </Flex>
  );
};
