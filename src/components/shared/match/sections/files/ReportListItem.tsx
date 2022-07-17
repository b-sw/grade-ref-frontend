import { Flex, Text } from '@chakra-ui/react';
import { ReportType } from 'hooks/useReports';
import { ActionType, GRADE_FILES_PERMISSIONS, Role } from 'utils/Role';
import { useStore } from 'zustandStore/store';
import { UploadFileZone } from './UploadReportZone';
import { DownloadableReport } from './DownloadableReport';
import { EmptyReportListItem } from './EmptyReportListItem';
import { useState } from 'react';
import { UploadedReportListItem } from './UploadedReportListItem';

interface Props {
  reportType: ReportType;
  isUploaded: boolean;
}

export const ReportListItem = (props: Props) => {
  const user = useStore((state) => state.user);
  //const role = role;

  const [role] = useState(Role.Observer);

  const hasReadPermissions = GRADE_FILES_PERMISSIONS[role][ActionType.Read].has(props.reportType);
  const hasWritePermissions = GRADE_FILES_PERMISSIONS[role][ActionType.Write].has(props.reportType);

  if (hasWritePermissions) {
    if (!props.isUploaded) {
      return (
        <Flex direction={'column'} w={'100%'}>
          <Text>{props.reportType}</Text>
          <UploadFileZone reportType={props.reportType} />
        </Flex>
      );
    }

    if (props.isUploaded) {
      return (
        <Flex direction={'column'} w={'100%'}>
          <Text>{props.reportType}</Text>
          <DownloadableReport reportType={props.reportType} />
        </Flex>
      );
    }
  }

  if (hasReadPermissions) {
    if (props.isUploaded) {
      return (
        <Flex direction={'column'} w={'100%'}>
          <Text>{props.reportType}</Text>
          <DownloadableReport reportType={props.reportType} />
        </Flex>
      );
    }

    if (!props.isUploaded) {
      return (
        <Flex direction={'column'} w={'100%'}>
          <Text>{props.reportType}</Text>
          <EmptyReportListItem />
        </Flex>
      );
    }
  }

  if (!hasReadPermissions) {
    if (props.isUploaded) {
      return (
        <Flex direction={'column'} w={'100%'}>
          <Text>{props.reportType}</Text>
          <UploadedReportListItem />
        </Flex>
      );
    } else {
      return (
        <Flex direction={'column'} w={'100%'}>
          <Text>{props.reportType}</Text>
          <EmptyReportListItem />
        </Flex>
      );
    }
  }

  return (
    <>
      <Text>Read:{hasReadPermissions.toString()}</Text>
      <Text>Write:{hasWritePermissions.toString()}</Text>
    </>
  );
};