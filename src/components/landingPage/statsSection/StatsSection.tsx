import {Box, Flex, Heading, SimpleGrid, Spacer, Text } from "@chakra-ui/react";
import { Parallax } from 'react-scroll-parallax';
import { useScrollPercentage } from "react-scroll-percentage";
import {useEffect} from "react";
import {useSetState} from "../../../hooks/useSetState";

const LEAGUES = 13;
const COUNTRIES = 3;
const GRADES = 748;

interface State {
  leaguesCount: number;
  countriesCount: number;
  gradesCount: number;
}

export const StatsSection = () => {
  const [ref, percentage] = useScrollPercentage({
    /* Optional options */
    threshold: 0,
  });

  const [state, setState] = useSetState({
    leaguesCount: 0,
    countriesCount: 0,
    gradesCount: 0,
  } as State);

  useEffect(() => {
    let factor: number = percentage;
    if (percentage > 0.5) {
      factor = 0.5;
    }
    setState({
      leaguesCount: Math.round(factor * 2 * LEAGUES),
      countriesCount: Math.round(factor * 2 * COUNTRIES),
      gradesCount: Math.round(factor * 2 * GRADES),
    } as State);
  }, [percentage]);

  return (
    <>
      <Flex
        p={4}
        m={0}
        h={'100vh'}
        direction={'column'}
        align={'center'}
        backgroundColor={'gray.400'}
        ref={ref}
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
            <Heading fontSize={'8xl'}>{state.leaguesCount}</Heading>
            <Text fontSize={'4xl'} fontWeight={'light'}>
              Leagues.
            </Text>
          </Box>
          </Parallax>

          <Parallax speed={-15}>
            <Box>
              <Heading fontSize={'8xl'}>{state.countriesCount}</Heading>
              <Text fontSize={'4xl'} fontWeight={'light'}>
                Countries.
              </Text>
            </Box>
          </Parallax>

          <Parallax speed={-15}>
            <Box>
              <Heading fontSize={'8xl'}>{state.gradesCount}</Heading>
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