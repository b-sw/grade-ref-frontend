import { Flex, Text } from '@chakra-ui/react';
import { ReportType } from 'hooks/useReports';
import { ActionType, GradeFilePermissions, Role } from 'utils/Role';
import { useStore } from 'zustandStore/store';
import { UploadReportZone } from 'components/matchPage/sections/files/UploadReportZone';
import { DownloadReportZone } from 'components/matchPage/sections/files/DownloadReportZone';
import { ReadOnlyReportZone } from "components/matchPage/sections/files/ReadOnlyReportZone";
import { AiOutlineFileDone, AiOutlineFileUnknown } from 'react-icons/ai';

interface ReportProps {
  reportType: ReportType;
  isUploaded: boolean;
}

export const Report = ({ reportType, isUploaded }: ReportProps) => {
  const user = useStore((state) => state.user);

  const hasReadPermissions = GradeFilePermissions[user.role! as Role][ActionType.Read].has(reportType);
  const hasWritePermissions = GradeFilePermissions[user.role! as Role][ActionType.Write].has(reportType);

  let report = <ReadOnlyReportZone text={'Empty'} iconType={AiOutlineFileUnknown} />;

  if (hasReadPermissions) {
    if (isUploaded) {
      report = <DownloadReportZone reportType={reportType} hasWritePermissions={hasWritePermissions} />;
    } else if (hasWritePermissions) {
      report = <UploadReportZone reportType={reportType} />;
    }
  } else if (isUploaded) {
    report = <ReadOnlyReportZone text={'Uploaded'} iconType={AiOutlineFileDone} />;
  }

  return (
    <Flex direction={'column'} w={'100%'}>
      <Text fontSize={'xl'} fontWeight={'medium'}>{reportType} report:</Text>
      {report}
    </Flex>
  );
};
