import { Badge, Flex, Spacer, Text } from '@chakra-ui/react';
import dayjs, { Dayjs } from 'dayjs';
import { useStore } from 'zustandStore/store';
import { MatchInfoEnriched } from 'entities/MatchInfoEnriched';

export interface Props {
  date: Dayjs;
  monthOffset: number;
  matches: MatchInfoEnriched[];
}

export const CalendarTile = (props: Props) => {
  const selectedDate: Dayjs = useStore((state) => state.selectedDate);
  const setSelectedDate: (date: Dayjs) => void = useStore((state) => state.setSelectedDate);

  const isCurrentMonth: boolean = props.date.month() === dayjs().add(props.monthOffset, 'month').month();
  const compareFormat = 'YYYY-MM-DD';

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
  };

  return (
    <Flex
      direction={'column'}
      align={'center'}
      borderRadius={10}
      backgroundColor={getTileColor()}
      borderColor={'gray.400'}
      p={2}
      gap={0}
      h={'100%'}
      cursor={'pointer'}
      onClick={() => setSelectedDate(props.date)}
      _hover={{
        borderWidth: '3px',
      }}
      transitionDuration={'background-color 0.2s'}
    >
      <Spacer />
      <Text fontWeight={'medium'} fontSize={'md'} opacity={isCurrentMonth ? 1 : 0.5}>
        {props.date.format('DD')}
      </Text>
      {props.matches.length > 0 && (
        <Badge variant={'solid'} colorScheme={'red'} opacity={isCurrentMonth ? 1 : 0.5}>
          {props.matches.length}
        </Badge>
      )}
      <Spacer />
    </Flex>
  );
};
