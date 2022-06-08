import React from 'react';
import {
  IconButton,
  Heading,
  Text,
  Flex,
  Spacer,
  Image,
} from '@chakra-ui/react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

const sliderProps = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export const PagesCarousel = () => {
  const [slider, setSlider] = React.useState<Slider | null>(null);

  const cards = [
    {
      heading: 'Reliability',
      shortText: 'Everything on time.',
      text: 'Be ahead of everyone by tracking the progress live and ensure that everything is right.',
      img: 'https://graderef.s3.eu-west-2.amazonaws.com/dashboardPage.png',
    },
    {
      heading: 'Scalability',
      shortText: 'Grow bigger with us.',
      text: 'Manage all of your leagues in one place. Create leagues, add officials and more.',
      img: 'https://graderef.s3.eu-west-2.amazonaws.com/explorerPage.png',
    },
    {
      heading: 'Ease of use',
      shortText: 'Convenient interface.',
      text: `Check calendar. Search for a match. See referee grades. Don't waste time.`,
      img: 'https://graderef.s3.eu-west-2.amazonaws.com/calendarPage.png',
    },
  ];

  return (
    <Flex
      p={4}
      h={'100vh'}
      align={'center'}
      direction={'row'}
      overflow={'hidden'}
    >
      <IconButton
        aria-label={'left-arrow'}
        variant={'ghost'}
        icon={<ArrowBackIcon />}
        onClick={() => slider?.slickPrev()}
      />

      <Flex
        overflow={'hidden'}
        direction={'column'}
      >
        <Slider {...sliderProps} ref={(slider) => setSlider(slider)}>
          {cards.map((card, index) => (
            <Flex key={index}>
              <Flex direction={'row'} align={'center'} mx={20} p={10}>
                <Flex w={'60%'}>
                  <Image shadow={'xl'} src={card.img} />
                </Flex>
                <Flex direction={'column'} w={'40%'} ml={20}>
                  <Heading fontSize={'5xl'} fontWeight={'semibold'}>{card.heading}</Heading>
                  <Text fontSize={'2xl'} fontWeight={'light'}>
                    {card.shortText}
                  </Text>
                  <Text fontSize={'2xl'} opacity={0.6} fontWeight={'light'}>
                    {card.text}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          ))}
        </Slider>
        <Spacer />
      </Flex>

      <IconButton
        aria-label={'right-arrow'}
        variant={'ghost'}
        icon={<ArrowForwardIcon />}
        onClick={() => slider?.slickNext()}
      />
    </Flex>
  );
}