import { ArrowBackIcon, DeleteIcon } from "@chakra-ui/icons";
import {Button, Flex, Link, Spacer, Text, useDisclosure } from "@chakra-ui/react";
import {Match} from "entities/Match";
import {Path} from "utils/Path";
import {uuid} from "utils/uuid";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { motion } from 'framer-motion';
import {useRef} from "react";
import {Details} from "components/shared/match/sections/details/Details";
import {Team} from "entities/Team";
import {User} from "entities/User";
import {DetailsEditModal} from "components/shared/match/sections/details/DetailsEditModal";
import {Assignments} from "components/shared/match/sections/assignments/Assignments";
import {Sanctions} from "components/shared/match/sections/sanctions/Sanctions";
import {Conclusions} from "components/shared/match/sections/conclusions/Conclusions";
import {useFouls} from "components/shared/match/sections/sanctions/useFouls";
import {LoadingOverlay} from "pages/LoadingOverlay";
import {useLeagueTeams} from "hooks/useLeagueTeams";
import {useFeatures} from "components/shared/match/sections/conclusions/useFeatures";
import {RefereeNote} from "components/shared/match/sections/note/RefereeNote";
import {scrollbarStyle} from "components/dashboard/shared/styles";
import {MatchListItem} from "components/adminDashboard/matches/MatchListItem";
import {MatchDeleteModal} from "components/adminDashboard/matches/MatchDeleteModal";
import {useStore} from "zustandStore/store";
import {Role} from "utils/Role";
import {Grade} from "components/shared/match/sections/grade/Grade";

export const enum MatchData {
  Details = 'Match Details',
  Grade = 'Match Grade',
  Assignments = 'Assignments',
  DisciplinarySanctions = 'Disciplinary sanctions',
  Conclusions = 'Conclusions',
  RefereeNote = 'Referee note',
}

interface MatchOverviewPanelProps {
  match: Match;
  teams: Team[];
  referees: User[];
  observers: User[];
}

const PADDING = 4;

export const MatchOverviewPanel = ({ match, teams, referees, observers }: MatchOverviewPanelProps) => {
  const { isOpen: isEditDetailsModalOpen, /*onOpen: onEditDetailsModalOpen,*/ onClose: onEditDetailsModalClose } = useDisclosure();
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
  const { query: foulsQuery } = useFouls({ matchId: match.id });
  const { query: featuresQuery } = useFeatures({ matchId: match.id });
  const { query: teamsQuery } = useLeagueTeams();
  const user = useStore(state => state.user);

  const navigate: NavigateFunction = useNavigate();
  const { leagueId } = useParams<{ leagueId: uuid }>();

  const overviewRef: any = useRef();
  const detailsRef: any = useRef();
  const gradeRef: any = useRef();
  const assignmentsRef: any = useRef();
  const foulsRef: any = useRef();
  const conclusionsRef: any = useRef();
  const noteRef: any = useRef();

  const homeTeam: Team = teams.find((team: Team) => team.id === match.homeTeamId)!;
  const awayTeam: Team = teams.find((team: Team) => team.id === match.awayTeamId)!;
  const referee: User = referees.find((referee: User) => referee.id === match.refereeId)!;
  const observer: User = observers.find((observer: User) => observer.id === match.observerId)!;

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
  }

  if (foulsQuery.isLoading || featuresQuery.isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <>
      <DetailsEditModal isOpen={isEditDetailsModalOpen} handleClose={onEditDetailsModalClose} match={match} />
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
          <Flex
            w={'100%'}
            alignItems={'center'}
            gap={2}
          >
            <Button
              as={motion.div}
              whileHover={{ right: 5 }}
              variant={'ghost'}
              leftIcon={<ArrowBackIcon />}
              onClick={() => { navigate(`${Path.ADMIN_DASHBOARD}/${leagueId}`); }}
            >
              Dashboard
            </Button>

            <Spacer />

            <MatchListItem key={match.id} readOnly={true} match={match} />

            <Spacer />
            <Button
              variant={'ghost'}
              leftIcon={<DeleteIcon />}
              onClick={onDeleteModalOpen}
              disabled={user.role !== Role.Admin}
            >
              Delete
            </Button>
          </Flex>

          <Flex
            gap={PADDING}
            overflowY={'hidden'}
            flexGrow={1}
            w={'100%'}
            h={['auto', '100%']}
            maxH={['90vh', '100%']}
          >
            <Flex
              direction={'column'}
              borderRadius={10}
              w={'20%'}
              gap={2}
            >
              <Text fontSize={'xl'} fontWeight={'medium'}>Page sections</Text>
              {menuLink(MatchData.Details, detailsRef)}
              {menuLink(MatchData.Grade, gradeRef)}
              {menuLink(MatchData.Assignments, assignmentsRef)}
              {menuLink(MatchData.DisciplinarySanctions, foulsRef)}
              {menuLink(MatchData.Conclusions, conclusionsRef)}
              {menuLink(MatchData.RefereeNote, noteRef)}
            </Flex>

            <Flex
              direction={'column'}
              p={PADDING}
              w={'80%'}
              overflowY={'hidden'}
            >
              <Flex
                direction={'column'}
                overflowY={'scroll'}
                css={scrollbarStyle}
                ref={overviewRef}
              >
                <Flex ref={detailsRef}>
                  <Details match={match} homeTeam={homeTeam} awayTeam={awayTeam}/>
                </Flex>

                <Flex ref={gradeRef}>
                  <Grade match={match} />
                </Flex>

                <Flex ref={assignmentsRef}>
                  <Assignments match={match} referee={referee} observer={observer} />
                </Flex>

                <Flex ref={foulsRef}>
                  <Sanctions match={match} fouls={foulsQuery.data!} teams={teamsQuery.data!} />
                </Flex>

                <Flex ref={conclusionsRef}>
                  <Conclusions match={match} features={featuresQuery.data!} />
                </Flex>

                <Flex ref={noteRef}>
                  <RefereeNote match={match} />
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        <Spacer />
      </Flex>
    </>
  );
}