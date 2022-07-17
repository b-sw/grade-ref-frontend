import { Flex, Spacer, Text } from '@chakra-ui/react';
import { Match } from 'entities/Match';
import { MatchData } from 'components/shared/match/MatchOverviewPanel';
import { MdNote } from 'react-icons/md';
import { ReportListItem } from './ReportListItem';
import { ReportType } from 'hooks/useReports';

interface Props {
  match: Match;
}

export const Files = (props: Props) => {
  return (
    <Flex direction={'column'} w={'100%'} mb={5} gap={2}>
      <Flex align={'center'} gap={2} mr={5}>
        <MdNote size={'25'} />
        <Text fontSize={'2xl'} fontWeight={'medium'}>
          {MatchData.Reports}
        </Text>
        <Spacer />
      </Flex>

      <Flex direction={'row'} gap={4} w={'100%'} borderRadius={10} backgroundColor={'gray.200'} p={5}>
        <ReportListItem isUploaded={props.match.observerReportKey != null} reportType={ReportType.Observer} />
        <ReportListItem isUploaded={props.match.mentorReportKey != null} reportType={ReportType.Mentor} />
        <ReportListItem isUploaded={props.match.tvReportKey != null} reportType={ReportType.Tv} />
      </Flex>
    </Flex>
  );
};
