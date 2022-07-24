import { Flex } from "@chakra-ui/react";

interface SectionProps {
  children: JSX.Element[];
}

export const Section = ({ children }: SectionProps) => {
  return (
    <Flex direction={'column'} w={'100%'} mb={5} gap={2} overflow={'hidden'}>
      {children}
    </Flex>
  );
}