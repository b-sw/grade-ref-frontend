import { Flex } from '@chakra-ui/react';
import { MatchData } from 'components/matchPage/MatchSectionsPanel';
import { Report } from 'components/matchPage/sections/files/Report';
import { ReportType } from 'hooks/useReports';
import { SectionHeading } from 'components/matchPage/components/SectionHeading';
import { AttachmentIcon } from '@chakra-ui/icons';
import { Section } from 'components/matchPage/components/Section';
import { SectionBody } from 'components/matchPage/components/SectionBody';
import { MatchInfoEnriched } from 'entities/MatchInfoEnriched';

interface ReportsProps {
  match: MatchInfoEnriched;
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
