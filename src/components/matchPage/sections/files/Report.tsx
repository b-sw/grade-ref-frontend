import { Flex, Text } from '@chakra-ui/react';
import { ReportType } from 'hooks/useReports';
import { ActionType, GradeFilePermissions, Role } from 'utils/Role';
import { useStore } from 'zustandStore/store';
import { UploadReportZone } from 'components/matchPage/sections/files/UploadReportZone';
import { DownloadReportZone } from 'components/matchPage/sections/files/DownloadReportZone';
import { ReadOnlyReportZone } from 'components/matchPage/sections/files/ReadOnlyReportZone';
import { AiOutlineFileDone, AiOutlineFileUnknown } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';

interface ReportProps {
  reportType: ReportType;
  isUploaded: boolean;
}

export const Report = ({ reportType, isUploaded }: ReportProps) => {
  const user = useStore((state) => state.user);
  const { t } = useTranslation();

  const reportTypeNames = {
    [ReportType.Observer]: t('matchPage.reports.observer'),
    [ReportType.Mentor]: t('matchPage.reports.mentor'),
    [ReportType.Tv]: t('matchPage.reports.tv'),
  };

  const hasReadPermissions = GradeFilePermissions[user.role! as Role][ActionType.Read].has(reportType);
  const hasWritePermissions = GradeFilePermissions[user.role! as Role][ActionType.Write].has(reportType);

  let report = <ReadOnlyReportZone text={t('matchPage.reports.empty')} iconType={AiOutlineFileUnknown} />;

  if (hasReadPermissions) {
    if (isUploaded) {
      report = <DownloadReportZone reportType={reportType} hasWritePermissions={hasWritePermissions} />;
    } else if (hasWritePermissions) {
      report = <UploadReportZone reportType={reportType} />;
    }
  } else if (isUploaded) {
    report = <ReadOnlyReportZone text={t('matchPage.reports.uploaded')} iconType={AiOutlineFileDone} />;
  }

  return (
    <Flex direction={'column'} w={'100%'}>
      <Text fontSize={'xl'} fontWeight={'medium'}>
        {reportTypeNames[reportType]} {t('matchPage.reports.report')}:
      </Text>
      {report}
    </Flex>
  );
};
