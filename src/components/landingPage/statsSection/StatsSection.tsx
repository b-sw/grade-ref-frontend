import {Box, Flex, Heading, SimpleGrid, Spacer, Text } from "@chakra-ui/react";
import { Parallax } from 'react-scroll-parallax';

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
        <Parallax speed={-10}>
          <Heading fontSize={'7xl'} fontWeight={'semibold'} color={'gray.50'} mb={10}>
            Our scale.
          </Heading>
        </Parallax>

        <SimpleGrid columns={[1, 3]} spacing={'100'}>
          <Parallax speed={-15}>
          <Box>
            <Heading fontSize={'8xl'}>7</Heading>
            <Text fontSize={'4xl'} fontWeight={'light'}>
              Leagues.
            </Text>
          </Box>
          </Parallax>

          <Parallax speed={-15}>
            <Box>
              <Heading fontSize={'8xl'}>3</Heading>
              <Text fontSize={'4xl'} fontWeight={'light'}>
                Countries.
              </Text>
            </Box>
          </Parallax>

          <Parallax speed={-15}>
            <Box>
              <Heading fontSize={'8xl'}>748</Heading>
              <Text fontSize={'4xl'} fontWeight={'light'}>
                Matches graded.
              </Text>
            </Box>
          </Parallax>
        </SimpleGrid>

        <Spacer />
      </Flex>
    </>
  );
}