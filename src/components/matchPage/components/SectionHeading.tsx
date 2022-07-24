import { Flex, Spacer, Text } from "@chakra-ui/react";

export interface SectionHeadingProps {
  title: string;
  icon: JSX.Element;
  children?: JSX.Element;
}

export const SectionHeading = ({ title, icon, children }: SectionHeadingProps) => {
  return (
    <Flex align={'center'} gap={2} mr={5} overflow={'hidden'}>
      {icon}
      <Text fontSize={'2xl'} fontWeight={'medium'}>
        {title}
      </Text>
      <Spacer />
      {children}
    </Flex>
  );
}