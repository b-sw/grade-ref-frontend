import { Badge, HStack, Text, VStack } from '@chakra-ui/react';
import { MdHistory, MdInsertChart } from 'react-icons/md';
import { CalendarIcon } from '@chakra-ui/icons';
import { Constants } from 'utils/Constants';
import dayjs from 'dayjs';
import { useMobile } from 'hooks/useMobile';
import { MatchInfoEnriched } from 'entities/MatchInfoEnriched';
import { useTranslation } from 'react-i18next';

interface Props {
    matches: MatchInfoEnriched[];
}

export const GradeSummaryHeading = (props: Props) => {
    const { isMobile } = useMobile();
    const { t } = useTranslation();

    const gradedMatches = props.matches.filter((match) => match.refereeGradeDate);
    const historyLength: number = isMobile ? 2 : 4;
    const recentMatches = Array.from({ ...gradedMatches, length: historyLength });

    return (
        <HStack p={3} mb={3} w={'100%'}>
            <VStack alignItems={'center'} w={'10%'}>
                <MdHistory size={isMobile ? '20' : '30'} />
                <Text fontSize={'xs'}>{t('grades.recent')}</Text>
            </VStack>
            {recentMatches.map((match, idx) => (
                <VStack alignItems={'baseline'} key={'recentMatch-' + idx} w={(90 / historyLength).toString() + '%'}>
                    <HStack>
                        <CalendarIcon />
                        <Text>
                            {match
                                ? dayjs(match.refereeGradeDate, Constants.DATETIME_FORMAT).format('DD-MM-YYYY')
                                : 'N/A'}
                        </Text>
                    </HStack>
                    <HStack>
                        <MdInsertChart />
                        <Badge variant={'outline'} colorScheme={match ? 'green' : 'gray'} fontSize={'xs'}>
                            {match ? match.refereeGrade : 'N/A'}
                        </Badge>
                    </HStack>
                </VStack>
            ))}
        </HStack>
    );
};
