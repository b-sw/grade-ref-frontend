import { Flex } from '@chakra-ui/react';
import { Match } from 'entities/Match';
import { MatchData } from 'components/shared/match/MatchOverviewPanel';
import { MdNote } from 'react-icons/md';
import { ReportListItem } from './ReportListItem';
import { ReportType } from 'hooks/useReports';
import { SectionHeading } from "components/shared/match/shared/SectionHeading";

interface ReportsProps {
  match: Match;
}

export const Reports = ({ match }: ReportsProps) => {
  return (
    <Flex direction={'column'} w={'100%'} mb={5} gap={2}>
      <SectionHeading title={MatchData.Reports} iconType={MdNote} />

      <Flex direction={'row'} gap={4} w={'100%'} borderRadius={10} backgroundColor={'gray.200'} p={5}>
        <ReportListItem isUploaded={!!match.observerReportKey} reportType={ReportType.Observer} />
        <ReportListItem isUploaded={!!match.mentorReportKey} reportType={ReportType.Mentor} />
        <ReportListItem isUploaded={!!match.tvReportKey} reportType={ReportType.Tv} />
      </Flex>
    </Flex>
  );
};
