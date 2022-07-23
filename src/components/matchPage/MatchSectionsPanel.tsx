import { ArrowBackIcon, DeleteIcon } from '@chakra-ui/icons';
import { Button, Flex, Icon, Link, Spacer, Text, useDisclosure } from '@chakra-ui/react';
import { Match } from 'entities/Match';
import { Path } from 'utils/Path';
import { uuid } from 'utils/uuid';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Details } from 'components/matchPage/sections/details/Details';
import { Team } from 'entities/Team';
import { User } from 'entities/User';
import { Assignments } from 'components/matchPage/sections/assignments/Assignments';
import { Sanctions } from 'components/matchPage/sections/sanctions/Sanctions';
import { Conclusions } from 'components/matchPage/sections/conclusions/Conclusions';
import { LoadingOverlay } from 'pages/LoadingOverlay';
import { useLeagueTeams } from 'hooks/useLeagueTeams';
import { useMatchFeatures } from 'components/matchPage/sections/conclusions/useMatchFeatures';
import { RefereeNote } from 'components/matchPage/sections/note/RefereeNote';
import { scrollbarStyle } from 'components/dashboard/styles/styles';
import { MatchListItem } from 'components/dashboard/matches/MatchListItem';
import { MatchDeleteModal } from 'components/admin/matches/MatchDeleteModal';
import { useStore } from 'zustandStore/store';
import { Role } from 'utils/Role';
import { Files } from 'components/matchPage/sections/files/Files';
import { useMatchFouls } from "components/matchPage/sections/sanctions/useMatchFouls";
import { Grade } from "components/matchPage/sections/grade/Grade";
import { OverallGrade } from 'components/matchPage/sections/overallGrade/OverallGrade';

export const enum MatchData {
  Details = 'Match Details',
  Grade = 'Grade',
  OverallGrade = 'Overall grade',
  Assignments = 'Assignments',
  DisciplinarySanctions = 'Disciplinary sanctions',
  Conclusions = 'Conclusions',
  RefereeNote = 'Referee note',
  Reports = 'Reports',
}

interface MatchOverviewPanelProps {
  match: Match;
  teams: Team[];
  referees: User[];
  observers: User[];
}

const PADDING = 4;

export const MatchSectionsPanel = ({ match, teams, referees, observers }: MatchOverviewPanelProps) => {
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
  const { query: teamsQuery } = useLeagueTeams();
  const user = useStore((state) => state.user);

  const navigate: NavigateFunction = useNavigate();
  const { leagueId } = useParams<{ leagueId: uuid }>();

  const overviewRef: any = useRef();
  const detailsRef: any = useRef();
  const gradeRef: any = useRef();
  const overallGradeRef: any = useRef();
  const assignmentsRef: any = useRef();
  const foulsRef: any = useRef();
  const conclusionsRef: any = useRef();
  const noteRef: any = useRef();
  const reportsRef: any = useRef();

  const homeTeam = teams.find((team: Team) => team.id === match.homeTeamId)!;
  const awayTeam = teams.find((team: Team) => team.id === match.awayTeamId)!;
  const referee = referees.find((referee: User) => referee.id === match.refereeId)!;
  const observer = observers.find((observer: User) => observer.id === match.observerId)!;

  const menuLink = (sectionName: MatchData, ref: any) => {
    return (
      <Link
        onClick={() => {
          overviewRef.current.scrollTo({
            top: ref.current.offsetTop - overviewRef.current.offsetTop,
            behavior: 'smooth',
          });
        }}
      >
        <Text fontSize={'md'}>{sectionName}</Text>
      </Link>
    );
  };

  return (
    <>
      <MatchDeleteModal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose} match={match} />
      <Flex
        overflow={'hidden'}
        gap={4}
      >
        <Spacer />

        <Flex
          direction={'column'}
          borderRadius={10}
          p={PADDING}
          backgroundColor={'gray.300'}
          shadow={'md'}
          overflowY={'hidden'}
          alignItems={'center'}
          flexGrow={1}
          maxH={['90vh', '100%']}
          gap={PADDING}
        >
          <Flex w={'100%'} alignItems={'center'} gap={2}>
            <Button
              as={motion.div}
              whileHover={{ right: 5 }}
              variant={'ghost'}
              leftIcon={<Icon as={ArrowBackIcon} />}
              onClick={() => {
                navigate(`${Path.ADMIN_DASHBOARD}/${leagueId}`);
              }}
            >
              Dashboard
            </Button>

            <Spacer />

            <MatchListItem key={match.id} readOnly={true} match={match} />

            <Spacer />
            <Button
              variant={'ghost'}
              leftIcon={<Icon as={DeleteIcon} />}
              onClick={onDeleteModalOpen}
              disabled={user.role !== Role.Admin}
            >
              Delete
            </Button>
          </Flex>

          <Flex gap={PADDING} overflowY={'hidden'} flexGrow={1} w={'100%'} h={['auto', '100%']} maxH={['90vh', '100%']}>
            <Flex direction={'column'} borderRadius={10} w={'15%'} gap={2}>
              <Text fontSize={'xl'} fontWeight={'medium'}>
                Page sections
              </Text>
              {menuLink(MatchData.Details, detailsRef)}
              {menuLink(MatchData.Grade, gradeRef)}
              {menuLink(MatchData.OverallGrade, overallGradeRef)}
              {menuLink(MatchData.Assignments, assignmentsRef)}
              {menuLink(MatchData.DisciplinarySanctions, foulsRef)}
              {menuLink(MatchData.Conclusions, conclusionsRef)}
              {menuLink(MatchData.RefereeNote, noteRef)}
              {menuLink(MatchData.Reports, reportsRef)}
            </Flex>

            <Flex direction={'column'} p={PADDING} w={'85%'} overflowY={'hidden'}>
              <Flex direction={'column'} overflowY={'scroll'} css={scrollbarStyle} ref={overviewRef}>
                <Flex ref={detailsRef}>
                  <Details match={match} homeTeam={homeTeam} awayTeam={awayTeam}/>
                </Flex>

                <Flex ref={gradeRef}>
                  <Grade match={match} />
                </Flex>

                <Flex ref={overallGradeRef}>
                  <OverallGrade match={match} />
                </Flex>

                <Flex ref={assignmentsRef}>
                  <Assignments match={match} referee={referee} observer={observer} />
                </Flex>

                <Flex ref={foulsRef}>
                  <Sanctions teams={teamsQuery.data!} match={match} />
                </Flex>

                <Flex ref={conclusionsRef}>
                  <Conclusions match={match} />
                </Flex>

                <Flex ref={noteRef}>
                  <RefereeNote match={match} />
                </Flex>

                <Flex ref={reportsRef}>
                  <Files match={match} />
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        <Spacer />
      </Flex>
    </>
  );
};
