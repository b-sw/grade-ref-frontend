import dayjs, { Dayjs } from "dayjs";
import useStore from "../../../zustand/store";
import {useSetState} from "../../../hooks/useSetState";
import {Center, Flex, Grid, GridItem, IconButton, SimpleGrid, Spacer, Text } from "@chakra-ui/react";
import {CalendarTile} from "./CalendarTile";
import { useEffect } from "react";
import { useCalendar } from "../../../hooks/useCalendar";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

export enum SlideDirection {
  LEFT = -1,
  RIGHT = 1,
}

export enum DayShortNames {
  MON = 'Mon',
  TUE = 'Tue',
  WED = 'Wed',
  THU = 'Thu',
  FRI = 'Fri',
  SAT = 'Sat',
  SUN = 'Sun',
}

interface Props {
  readOnly?: boolean;
}

interface State {
  days: Dayjs[];
  monthOffset: number;
  slideDirection: SlideDirection;
}

export const CalendarPanel = (props: Props) => {
  const setSelectedDate: (date: Dayjs) => void = useStore((state) => state.setSelectedDate);
  const [state, setState] = useSetState({
    days: [],
    monthOffset: 0,
    slideDirection: SlideDirection.RIGHT,
  } as State);

  const { getCalendarPageDays, getMonthName } = useCalendar();

  useEffect(() => {
    setSelectedDate(dayjs());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setState({ days: getCalendarPageDays(state.monthOffset) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.monthOffset]);

  return (
    <Flex
      direction={'column'}
      w={['100%', '70%']}
      h={['60vh', '100%']}
      borderRadius={10}
      p={5}
      backgroundColor={'gray.300'}
      shadow={'md'}
      overflowY={'hidden'}
    >
      <SimpleGrid columns={7} gap={2} mb={2}>
        {Object.values(DayShortNames).map((dayName) => (
          <Flex key={dayName}>
            <Spacer />
            <Text opacity={0.8}>{dayName}</Text>
            <Spacer />
          </Flex>
        ))}
      </SimpleGrid>

      <Grid
        templateColumns={'repeat(7, 1fr)'}
        templateRows={'repeat(6, 1fr)'}
        gap={2}
        flexGrow={1}
        overflow={'hidden'}
      >
        {state.days.map((day) => (
          <CalendarTile
            key={day.toString()}
            date={day}
            slideDirection={state.slideDirection}
            monthOffset={state.monthOffset}
          />
        ))}
        <GridItem colSpan={3} >
          <Center gap={4} borderRadius={10} h={'100%'}>
            <Spacer />
            <IconButton
              aria-label='left'
              icon={<ArrowBackIcon />}
              onClick={() => {
                setState({ monthOffset: state.monthOffset - 1 });
                setState({ slideDirection: SlideDirection.LEFT });
              }}
            />
            <Text fontWeight={'medium'} fontSize={'2xl'} textAlign={'center'} width={'30%'}>
              {getMonthName(state.monthOffset)}
            </Text>
            <IconButton
              aria-label='left'
              icon={<ArrowForwardIcon />}
              onClick={() => {
                setState({ monthOffset: state.monthOffset + 1 });
                setState({ slideDirection: SlideDirection.RIGHT });
              }}
            />
            <Spacer />
          </Center>
        </GridItem>
      </Grid>
    </Flex>
  );
}