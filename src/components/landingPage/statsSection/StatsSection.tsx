import {Box, Fade, Flex, Heading, SimpleGrid, Spacer, Text } from "@chakra-ui/react";
import { Parallax } from 'react-scroll-parallax';
import { useScrollPercentage } from "react-scroll-percentage";
import React, {useEffect} from "react";
import {useSetState} from "hooks/useSetState";
import { useCountUp } from "use-count-up";

const LEAGUES = 13;
const COUNTRIES = 3;
const GRADES = 748;

interface State {
  countStarted: boolean;
}

export const StatsSection = () => {
  const [ref, percentage] = useScrollPercentage({
    threshold: 0,
  });
  const [state, setState] = useSetState({ countStarted: false } as State);

  const { value: leaguesCount } = useCountUp({
    isCounting: state.countStarted,
    start: 0,
    end: LEAGUES,
    duration: 3,
  });

  const { value: countriesCount } = useCountUp({
    isCounting: state.countStarted,
    start: 0,
    end: COUNTRIES,
    duration: 3,
  });

  const { value: gradesCount } = useCountUp({
    isCounting: state.countStarted,
    start: 0,
    end: GRADES,
    duration: 3,
  });

  useEffect(() => {
    if (percentage > 0.25 && !state.countStarted) {
      setState({ countStarted: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <Fade in={state.countStarted}>
              <Heading fontSize={'8xl'}>{leaguesCount}</Heading>
            </Fade>
            <Text fontSize={'4xl'} fontWeight={'light'}>
              Leagues.
            </Text>
          </Box>
          </Parallax>

          <Parallax speed={-15}>
            <Box>
              <Fade in={state.countStarted}>
                <Heading fontSize={'8xl'}>{countriesCount}</Heading>
              </Fade>
              <Text fontSize={'4xl'} fontWeight={'light'}>
                Countries.
              </Text>
            </Box>
          </Parallax>

          <Parallax speed={-15}>
            <Box>
              <Fade in={state.countStarted}>
                <Heading fontSize={'8xl'}>{gradesCount}</Heading>
              </Fade>
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