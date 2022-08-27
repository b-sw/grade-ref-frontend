import { Divider, Flex, Spacer, Text } from '@chakra-ui/react';
import 'react-device-frameset/styles/marvel-devices.min.css';
import { HeroLoginPanel } from './HeroLoginPanel';
import { Parallax } from 'react-parallax';
import { useMobile } from 'hooks/useMobile';
import { Parallax as ScrollParallax } from 'react-scroll-parallax';
import { useTranslation } from 'react-i18next';

export const MOBILE_WINDOW_WIDTH = 768;

export const Hero = () => {
    const { isMobile } = useMobile();
    const { t } = useTranslation();

    return (
        <Parallax
            strength={500}
            bgImage={`https://graderef.s3.eu-west-2.amazonaws.com/heroSection.jpg`}
            bgImageSizes={'cover'}
            disabled={isMobile}
            bgImageStyle={{ objectFit: 'cover' }}
        >
            <ScrollParallax speed={-10}>
                <Flex
                    p={4}
                    m={0}
                    h={'100vh'}
                    direction={['column', 'column', 'row']}
                    overflow={'hidden'}
                    position={['unset', 'unset', 'relative']}
                >
                    <Flex h={['50%', '50%', '100%']} w={'100%'} direction={'column'} order={[1, 1, 2]} align={'center'}>
                        <Spacer />

                        <Flex
                            direction={'column'}
                            w={['100%', '100%', '30%']}
                            px={[0, 0, 5]}
                            mx={[0, 0, 5]}
                            align={'center'}
                            backgroundColor={'whiteAlpha.800'}
                            rounded={'xl'}
                        >
                            <Text fontSize={'4xl'} color={'gray.700'} mt={2}>
                                <b>GradeRef</b>
                            </Text>
                            <Text fontSize={'lg'} color={'gray.900'} align={'center'} mb={5}>
                                {t('hero.description')}
                            </Text>
                            <Divider borderColor={'gray.700'} w={'80%'} />
                            <HeroLoginPanel />
                        </Flex>

                        <Spacer />
                    </Flex>
                </Flex>
            </ScrollParallax>
        </Parallax>
    );
};
