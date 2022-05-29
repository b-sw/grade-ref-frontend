import { Flex, SlideFade, Spacer, Text } from "@chakra-ui/react";
import dayjs, { Dayjs } from "dayjs";
import { SlideDirection } from "./CalendarPanel";
import useStore from "../../../zustand/store";

export interface Props {
  date: Dayjs;
  slideDirection: SlideDirection;
  monthOffset: number;
}

export const CalendarTile = (props: Props) => {
  const selectedDate: Dayjs = useStore((state) => state.selectedDate);
  const setSelectedDate: (date: Dayjs) => void = useStore((state) => state.setSelectedDate);

  const isCurrentMonth: boolean = props.date.month() === dayjs().add(props.monthOffset, 'month').month();
  const compareFormat: string = 'YYYY-MM-DD';

  const getTileColor = (): string => {
    if (props.date.format(compareFormat) === selectedDate.format(compareFormat)) {
      return 'blue.300';
    }

    if (props.date.format(compareFormat) === dayjs().format(compareFormat)) {
      return 'blue.100';
    }

    if (isCurrentMonth) {
      return 'gray.50';
    }

    return 'gray.200';
  }

  return (
    <SlideFade in={true} offsetX={100 * props.slideDirection} offsetY={0}>
      <Flex
        direction={'column'}
        align={'center'}
        borderRadius={10}
        backgroundColor={getTileColor()}
        minHeight={'0px'}
        p={2}
        gap={0}
        minW={0}
        h={'100%'}
        cursor={'pointer'}
        onClick={() => setSelectedDate(props.date)}
        transitionDuration={'0.2s'}
      >
        <Spacer />
        <Text fontWeight={'medium'} fontSize={'md'} opacity={isCurrentMonth ? 1 : 0.5}>
          {props.date.format('DD')}
        </Text>
        <Spacer />
      </Flex>
    </SlideFade>
  );
}