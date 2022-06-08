import {Box, Flex, Heading, SimpleGrid, Spacer, Text } from "@chakra-ui/react";

export const StatsSection = () => {
  return (
    <>
      <Flex
        p={4}
        m={0}
        h={'100vh'}
        direction={'column'}
        align={'center'}
        backgroundColor={'gray.400'}
      >
        <Spacer />
        <Heading fontSize={'5xl'} fontWeight={'semibold'} color={'gray.50'} mb={10}>
          Our scale.
        </Heading>

        <SimpleGrid columns={[1, 3]} spacing={'100'}>
          <Box>
            <Heading fontSize={'8xl'}>7</Heading>
            <Text fontSize={'3xl'} fontWeight={'light'}>
              Leagues.
            </Text>
          </Box>

          <Box>
            <Heading fontSize={'8xl'}>3</Heading>
            <Text fontSize={'3xl'} fontWeight={'light'}>
              Countries.
            </Text>
          </Box>

          <Box>
            <Heading fontSize={'8xl'}>748</Heading>
            <Text fontSize={'3xl'} fontWeight={'light'}>
              Matches graded.
            </Text>
          </Box>
        </SimpleGrid>

        <Spacer />
      </Flex>
    </>
  );
}