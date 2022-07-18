import { Flex } from '@chakra-ui/react';
import { Match } from 'entities/Match';
import { MatchData } from 'components/shared/match/MatchOverviewPanel';
import { Report } from 'components/shared/match/sections/files/Report';
import { ReportType } from 'hooks/useReports';
import { SectionHeading } from "components/shared/match/components/SectionHeading";
import { AttachmentIcon } from '@chakra-ui/icons';

interface ReportsProps {
  match: Match;
}

export const Files = ({ match }: ReportsProps) => {
  return (
    <Flex direction={'column'} w={'100%'} mb={5} gap={2}>
      <SectionHeading title={MatchData.Reports} icon={<AttachmentIcon boxSize={25} />} />

      <Flex direction={'row'} gap={4} w={'100%'} borderRadius={10} backgroundColor={'gray.200'} p={5}>
        <Report isUploaded={!!match.observerReportKey} reportType={ReportType.Observer} />
        <Report isUploaded={!!match.mentorReportKey} reportType={ReportType.Mentor} />
        <Report isUploaded={!!match.tvReportKey} reportType={ReportType.Tv} />
      </Flex>
    </Flex>
  );
};
