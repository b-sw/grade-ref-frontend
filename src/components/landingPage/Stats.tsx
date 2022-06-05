import {Box, Flex, GridItem, Heading, SimpleGrid, Spacer, Text } from "@chakra-ui/react";

export const Stats = () => {
  return (
    <>
      <Flex
        p={4}
        m={0}
        h={'100vh'}
        direction={'column'}
        align={'center'}
        backgroundColor={'gray.600'}
      >
        <Flex>
          <Spacer />
          <Heading>
            Our scale
          </Heading>
          <Spacer />
        </Flex>

        <SimpleGrid>
          <GridItem d={['none', 'unset']} />
          <Box>
            <Heading>
              ssss
            </Heading>
            <Text>
              bbbb
            </Text>
          </Box>
        </SimpleGrid>
      </Flex>
    </>
  );
}