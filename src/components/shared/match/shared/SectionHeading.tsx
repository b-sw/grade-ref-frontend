import { IconType } from "react-icons";
import { Flex, Icon, Spacer, Text } from "@chakra-ui/react";

export interface SectionHeadingProps {
  title: string;
  iconType?: IconType;
  icon?: JSX.Element;
  children?: JSX.Element;
}

export const SectionHeading = ({ title, iconType, icon, children }: SectionHeadingProps) => {
  return (
    <Flex align={'center'} gap={2} mr={5}>
      {iconType ? <Icon as={iconType} boxSize={25} /> : icon}
      <Text fontSize={'2xl'} fontWeight={'medium'}>
        {title}
      </Text>
      <Spacer />
      {children}
    </Flex>
  );
}