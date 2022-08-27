import { ArrowBackIcon, DeleteIcon } from '@chakra-ui/icons';
import { Button, Flex, Icon, Link, Spacer, Text, useDisclosure } from '@chakra-ui/react';
import { Path } from 'utils/Path';
import { uuid } from 'utils/uuid';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Details } from 'components/matchPage/sections/details/Details';
import { Assignments } from 'components/matchPage/sections/assignments/Assignments';
import { Sanctions } from 'components/matchPage/sections/sanctions/Sanctions';
import { Conclusions } from 'components/matchPage/sections/conclusions/Conclusions';
import { useLeagueTeams } from 'hooks/useLeagueTeams';
import { RefereeNote } from 'components/matchPage/sections/note/RefereeNote';
import { MatchListItem } from 'components/dashboard/matches/MatchListItem';
import { MatchDeleteModal } from 'components/admin/matches/MatchDeleteModal';
import { useStore } from 'zustandStore/store';
import { Role } from 'utils/Role';
import { Files } from 'components/matchPage/sections/reports/Files';
import { Grade } from 'components/matchPage/sections/grade/Grade';
import { OverallGrade } from 'components/matchPage/sections/overallGrade/OverallGrade';
import { MatchInfoEnriched } from 'entities/MatchInfoEnriched';
import { useTranslation } from 'react-i18next';

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
    match: MatchInfoEnriched;
}

const PADDING = 4;

export const MatchSectionsPanel = ({ match }: MatchOverviewPanelProps) => {
    const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
    const { query: teamsQuery } = useLeagueTeams();
    const user = useStore((state) => state.user);
    const { t } = useTranslation();

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

    const sectionNames = {
        [MatchData.Details]: t('matchPage.details.title'),
        [MatchData.Grade]: t('matchPage.grade.title'),
        [MatchData.OverallGrade]: t('matchPage.overallGrade.title'),
        [MatchData.Assignments]: t('matchPage.assignments.title'),
        [MatchData.DisciplinarySanctions]: t('matchPage.sanctions.title'),
        [MatchData.Conclusions]: t('matchPage.conclusions.title'),
        [MatchData.RefereeNote]: t('matchPage.note.title'),
        [MatchData.Reports]: t('matchPage.reports.title'),
    };

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
                <Text fontSize={'md'}>{sectionNames[sectionName]}</Text>
            </Link>
        );
    };

    const userIsAdmin = user.role === Role.Admin;

    return (
        <>
            <MatchDeleteModal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose} match={match} />
            <Flex overflow={'hidden'}>
                <Spacer />

                <Flex
                    direction={'column'}
                    borderRadius={10}
                    p={PADDING}
                    backgroundColor={'gray.300'}
                    shadow={'md'}
                    overflow={'hidden'}
                    alignItems={'center'}
                    maxH={['90vh', '100%']}
                    w={'80%'}
                    maxW={'100%'}
                    gap={PADDING}
                >
                    <Flex w={'100%'} alignItems={'center'} gap={2}>
                        <Button
                            as={motion.div}
                            whileHover={{ right: 5 }}
                            variant={'ghost'}
                            leftIcon={<Icon as={ArrowBackIcon} />}
                            onClick={() => {
                                const dashboardPath = userIsAdmin ? Path.ADMIN_DASHBOARD : Path.DASHBOARD;
                                navigate(`${dashboardPath}/${leagueId}`);
                            }}
                        >
                            {t('pageNames.dashboard')}
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
                            {t('modal.delete')}
                        </Button>
                    </Flex>

                    <Flex gap={PADDING} overflow={'hidden'} w={'100%'} h={['auto', '100%']} maxH={['90vh', '100%']}>
                        <Flex direction={'column'} borderRadius={10} w={'15%'} gap={2}>
                            <Text fontSize={'xl'} fontWeight={'medium'}>
                                {t('matchPage.sections')}
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
                            <Flex direction={'column'} overflowY={'scroll'} ref={overviewRef} pr={5}>
                                <Flex ref={detailsRef}>
                                    <Details match={match} />
                                </Flex>

                                <Flex ref={gradeRef}>
                                    <Grade match={match} />
                                </Flex>

                                <Flex ref={overallGradeRef}>
                                    <OverallGrade match={match} />
                                </Flex>

                                <Flex ref={assignmentsRef}>
                                    <Assignments match={match} />
                                </Flex>

                                <Flex ref={foulsRef}>
                                    <Sanctions teams={teamsQuery.data!} />
                                </Flex>

                                <Flex ref={conclusionsRef}>
                                    <Conclusions />
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
