import { Icon } from "@chakra-ui/react";
import { Dropzone } from "components/shared/match/components/Dropzone";
import { IconType } from "react-icons";

interface ReadOnlyReportZoneProps {
  text: string;
  iconType: IconType;
}

export const ReadOnlyReportZone = ({ text, iconType}: ReadOnlyReportZoneProps) => {
  return (
    <Dropzone
      text={text}
      opacity={0.8}
    >
      <Icon as={iconType} boxSize={35} />
    </Dropzone>
  );
};
