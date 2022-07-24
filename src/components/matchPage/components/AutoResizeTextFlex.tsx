import { Flex, Text } from "@chakra-ui/react";

interface AutoResizeTextFlexProps {
  text: string;
}

export const AutoResizeTextFlex = ({ text }: AutoResizeTextFlexProps) => {
  return (
    <Flex
      borderRadius={10}
      backgroundColor={'gray.100'}
      p={5}
      overflowY={'scroll'}
      maxH={'50vh'}
    >
      <Text whiteSpace={'pre-wrap'} >{text}</Text>
    </Flex>
  );
}
