import {EditIcon, WarningIcon } from "@chakra-ui/icons";
import {Badge, Button, Flex, HStack, Spacer, Text, Textarea, Tooltip } from "@chakra-ui/react";
import dayjs from "dayjs";
import {Match} from "entities/Match";
import {Team} from "entities/Team";
import {User} from "entities/User";
import {Constants} from "utils/Constants";
import { BiDetail } from "react-icons/bi";

interface Props {
  match: Match;
  homeTeam: Team;
  awayTeam: Team;
  referee: User;
  observer: User;
}

export const Details = (props: Props) => {
  // const user = useStore((state) => state.user);
  const getReadableDatetime = (date: Date, format: string): string => {
    return date ? dayjs(date, Constants.DATETIME_FORMAT).format(format) : 'N/A';
  }

  const matchDate: string = getReadableDatetime(props.match.matchDate, 'DD-MM-YYYY');
  const matchTime: string = getReadableDatetime(props.match.matchDate, 'HH:mm');
  const refereeGradeDate: string = getReadableDatetime(props.match.refereeGradeDate, 'DD-MM-YYYY HH:mm');
  const overallGradeDate: string = getReadableDatetime(props.match.overallGradeDate, 'DD-MM-YYYY HH:mm');

  return (
    <Flex direction={'column'} w={'100%'} mb={5} gap={2}>
      <Flex align={'center'} gap={2} mr={5}>
        <BiDetail size={'25'}/>
        <Text fontSize={'2xl'} fontWeight={'medium'}>Match Details</Text>
        <Spacer />
        <Button
          variant={'ghost'}
          leftIcon={<EditIcon />}
          onClick={() => {}}
        >
          Edit
        </Button>
      </Flex>

      <Flex
        direction={'column'}
        w={'100%'}
        borderRadius={10}
        backgroundColor={'gray.200'}
        p={5}
      >
        <Flex direction={'column'} pr={[0, 20]} gap={2}>
          <Flex gap={5}>
            <Flex w={'50%'}>
              <Spacer />
              <Text fontSize={'xl'}>date</Text>
            </Flex>
            <Flex w={'50%'}>
              <Text fontSize={'xl'} fontWeight={'medium'}>{matchDate}</Text>
              <Spacer />
            </Flex>
          </Flex>

          <Flex gap={5}>
            <Flex w={'50%'}>
              <Spacer />
              <Text fontSize={'xl'}>time</Text>
            </Flex>
            <Flex w={'50%'}>
              <Text fontSize={'xl'} fontWeight={'medium'}>{matchTime}</Text>
              <Spacer />
            </Flex>
          </Flex>

          <Flex gap={5}>
            <Flex w={'50%'}>
              <Spacer />
              <Text fontSize={'xl'}>stadium</Text>
            </Flex>
            <Flex w={'50%'}>
              <Text fontSize={'xl'} fontWeight={'medium'}>{props.match.stadium}</Text>
              <Spacer />
            </Flex>
          </Flex>

          <Flex gap={5}>
            <Flex w={'50%'}>
              <Spacer />
              <Text fontSize={'xl'}>home team</Text>
            </Flex>
            <Flex w={'50%'}>
              <Text fontSize={'xl'} fontWeight={'medium'}>{props.homeTeam.name}</Text>
              <Spacer />
            </Flex>
          </Flex>

          <Flex gap={5} mb={5}>
            <Flex w={'50%'}>
              <Spacer />
              <Text fontSize={'xl'}>away team</Text>
            </Flex>
            <Flex w={'50%'}>
              <Text fontSize={'xl'} fontWeight={'medium'}>{props.awayTeam.name}</Text>
              <Spacer />
            </Flex>
          </Flex>

          <Flex gap={5}>
            <Flex w={'50%'}>
              <Spacer />
              <Text fontSize={'xl'}>grade</Text>
            </Flex>
            <Flex w={'50%'} align={'center'}>
              <Badge variant={'outline'} colorScheme={props.match.gradeStatus.badgeScheme} fontSize={'md'} w={'auto'}>
                {props.match.refereeGrade ?? 'N/A'}
              </Badge>
              <Spacer />
            </Flex>
          </Flex>

          <Flex gap={5}>
            <Flex w={'50%'}>
              <Spacer />
              <Text fontSize={'xl'}>grade date</Text>
            </Flex>
            <Flex w={'50%'} gap={2}>
              <Text fontSize={'xl'} fontWeight={'medium'}>{refereeGradeDate}</Text>
              {props.match.gradeStatus.delay &&
                <HStack>
                  <Tooltip label='delay'>
                    <WarningIcon color={'red.600'}/>
                  </Tooltip>
                  <Text color={'red.600'}>+{props.match.gradeStatus.delay}</Text>
                </HStack>
              }
              <Spacer />
            </Flex>
          </Flex>

          <Flex gap={5}>
            <Flex w={'50%'} align={'center'}>
              <Spacer />
              <Text fontSize={'xl'}>overall grade</Text>
            </Flex>
            <Flex w={'50%'}>
              <Textarea
                isReadOnly={true}
                resize={'none'}
                value={props.match.overallGrade ?? 'N/A'}
                borderColor={'gray.400'}
                focusBorderColor={'gray.400'}
                backgroundColor={'gray.100'}
                _hover={{}}
              />
            </Flex>
          </Flex>

          <Flex gap={5}>
            <Flex w={'50%'}>
              <Spacer />
              <Text fontSize={'xl'}>overall grade date</Text>
            </Flex>
            <Flex w={'50%'}>
              <Text fontSize={'xl'} fontWeight={'medium'}>{overallGradeDate}</Text>
            </Flex>
          </Flex>

        </Flex>
      </Flex>
    </Flex>
  );
}