import {Divider, Flex, Spacer, Text} from "@chakra-ui/react";
import {HeroLoginPanel} from "./HeroLoginPanel";

export const Hero = () => {
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
    >
      <Flex
        h={['50%', '50%', '100%']}
        direction={'column'}
        w={['100%', '100%', '50%']}
        order={[2, 2, 1]}
        textAlign={'center'}
      >
        <Spacer />
        <Text fontSize={'4xl'} color={'gray.200'} mb={5}>
          Dummy text
        </Text>
        <Spacer />
      </Flex>

      <Flex
        h={['50%', '50%', '100%']}
        direction={'column'}
        w={['100%', '100%', '50%']}
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