import { Flex } from '@chakra-ui/react';
import { Match } from 'entities/Match';
import { MatchData } from 'components/shared/match/MatchOverviewPanel';
import { Report } from 'components/shared/match/sections/files/Report';
import { ReportType } from 'hooks/useReports';
import { SectionHeading } from "components/shared/match/components/SectionHeading";
import { AttachmentIcon } from '@chakra-ui/icons';
import { Section } from 'components/shared/match/components/Section';
import { SectionBody } from 'components/shared/match/components/SectionBody';

interface ReportsProps {
  match: Match;
}

export const Files = ({ match }: ReportsProps) => {
  return (
    <Section>
      <SectionHeading title={MatchData.Reports} icon={<AttachmentIcon boxSize={25} />} />

      <SectionBody>
        <Flex direction={'row'} gap={4}>
          <Report isUploaded={!!match.observerReportKey} reportType={ReportType.Observer} />
          <Report isUploaded={!!match.mentorReportKey} reportType={ReportType.Mentor} />
          <Report isUploaded={!!match.tvReportKey} reportType={ReportType.Tv} />
        </Flex>
      </SectionBody>
    </Section>
  );
};
