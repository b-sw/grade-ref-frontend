import {Divider, Flex, Spacer, Text} from "@chakra-ui/react";
import 'react-device-frameset/styles/marvel-devices.min.css'
import {HeroLoginPanel} from "./HeroLoginPanel";
import {useEffect} from "react";
import {useSetState} from "../../hooks/useSetState";
import {Device} from "./Device";

interface State {
  isMobile: boolean;
}

export const MOBILE_WINDOW_WIDTH = 768;

export const Hero = () => {
  const [state, setState] = useSetState({
    isMobile: window.innerWidth < MOBILE_WINDOW_WIDTH
  } as State);

  useEffect(() => {
    window.addEventListener('resize', () => setState({ isMobile: window.innerWidth < MOBILE_WINDOW_WIDTH }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex
      p={4}
      m={0}
      h={'100vh'}
      direction={['column', 'column', 'row']}
      overflow={'hidden'}
      position={['unset', 'unset', 'relative']}
      backgroundColor={'gray.400'}
      backgroundImage={`url(https://graderef.s3.eu-west-2.amazonaws.com/hero.jpg)`}
      backgroundPosition={'center'}
      backgroundRepeat={'no-repeat'}
      backgroundSize={'cover'}
    >
      {!state.isMobile && (
        <Flex
          h={['50%', '50%', '100%']}
          w={['100%', '100%', '50%']}
          direction={'column'}
          order={[2, 2, 1]}
          align={'center'}
        >
          <Spacer />
          <Flex
            w={['100%', '100%', '90%']}
            direction={'row'}
          >
            <Spacer />
            <Device />
          </Flex>
          <Spacer />
        </Flex>
      )}

      <Flex
        h={['50%', '50%', '100%']}
        w={['100%', '100%', '50%']}
        direction={'column'}
        order={[1, 1, 2]}
      >
        <Spacer />
        <Flex
          direction={'column'}
          w={['100%', '100%', '35%']}
          px={[0, 0, 5]}
          mx={[0, 0, 5]}
          align={'center'}
          backgroundColor={'whiteAlpha.800'}
          rounded={'xl'}
        >
          <Text fontSize={'4xl'} color={'gray.700'} mt={2}><b>Grade referee</b></Text>
          <Text fontSize={'lg'} color={'gray.900'} align={'center'} mb={5}>
            Easily manage your league by keeping track of its officials
          </Text>
          <Divider borderColor={'gray.700'} />
          <HeroLoginPanel />
        </Flex>
        <Spacer />
      </Flex>
    </Flex>
  );
}