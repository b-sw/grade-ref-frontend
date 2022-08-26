import { Flex } from '@chakra-ui/react';
import { Report } from 'components/matchPage/sections/reports/Report';
import { ReportType } from 'hooks/useReports';
import { SectionHeading } from 'components/matchPage/components/SectionHeading';
import { AttachmentIcon } from '@chakra-ui/icons';
import { Section } from 'components/matchPage/components/Section';
import { SectionBody } from 'components/matchPage/components/SectionBody';
import { MatchInfoEnriched } from 'entities/MatchInfoEnriched';
import { useTranslation } from 'react-i18next';

interface ReportsProps {
    match: MatchInfoEnriched;
}

export const Files = ({ match }: ReportsProps) => {
    const { t } = useTranslation();

    return (
        <Section>
            <SectionHeading title={t('matchPage.reports.title')} icon={<AttachmentIcon boxSize={25} />} />

            <SectionBody>
                <Flex direction={'row'} gap={4}>
                    <Report isUploaded={!!match.observerReportKey} reportType={ReportType.Observer} />
                    <Report isUploaded={!!match.mentorReportKey} reportType={ReportType.Mentor} />
                    <Report isUploaded={!!match.tvReportKey} reportType={ReportType.Tv} />
                    <Report isUploaded={!!match.selfReportKey} reportType={ReportType.Self} />
                </Flex>
            </SectionBody>
        </Section>
    );
};
