import { Flex, Text } from "@chakra-ui/react";
import { ReportType } from "hooks/useReports";
import { Role } from "utils/Role";
import { useStore } from "zustandStore/store";
import { UploadFileZone } from "./UploadReportZone";
import { UploadedReportListItem } from "./UploadedReportListItem";
import { EmptyReportListItem } from "./EmptyReportListItem";
import { useState } from "react";

interface Props {
  type: ReportType;
  isUploaded: boolean;
}

export const ReportListItem = (props: Props) => {
  const user = useStore((state) => state.user);
  //const role = role;

  const [role] = useState(Role.Referee);

  const hasRoleToDownload = () => {
    switch (props.type) {
      case ReportType.OBSERVER:
        return true;
      case ReportType.MENTOR:
        return role === Role.Referee || role === Role.Admin;
      case ReportType.TV:
        return role === Role.Referee || role === Role.Admin;
    }
  };

  const hasRoleToUpload = () => {
    switch (props.type) {
      case ReportType.OBSERVER:
        return role === Role.Observer;
      case ReportType.MENTOR:
      case ReportType.TV:
        return role === Role.Referee;
    }
  };

  return (
    <Flex direction={"column"} w={"100%"}>
      <Text>{props.type}</Text>
      {props.isUploaded && <UploadedReportListItem type={props.type} />}
      {!props.isUploaded && hasRoleToUpload() && <UploadFileZone type={props.type} />}
      {!props.isUploaded && !hasRoleToUpload() && <EmptyReportListItem />}
    </Flex>
  );
};
