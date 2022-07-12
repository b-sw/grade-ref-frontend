import {User} from "entities/User";
import {Match} from "entities/Match";
import {Button, Flex, Spacer, Text} from "@chakra-ui/react";
import { MdPeople } from "react-icons/md";
import { EditIcon } from "@chakra-ui/icons";
import {MatchData} from "components/shared/match/MatchOverviewPanel";

interface Props {
  match: Match;
  referee: User;
  observer: User;
}

export const Assignments = (props: Props) => {
  // const user = useStore((state) => state.user);

  return (
    <Flex direction={'column'} w={'100%'} mb={5} gap={2}>
      <Flex align={'center'} gap={2} mr={5}>
        <MdPeople size={'25'}/>
        <Text fontSize={'2xl'} fontWeight={'medium'}>{MatchData.Assignments}</Text>
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
              <Text fontSize={'xl'}>referee</Text>
            </Flex>
            <Flex w={'50%'}>
              <Text fontSize={'xl'} fontWeight={'medium'}>{props.referee.firstName} {props.referee.lastName}</Text>
              <Spacer />
            </Flex>
          </Flex>

          <Flex gap={5}>
            <Flex w={'50%'}>
              <Spacer />
              <Text fontSize={'xl'}>observer</Text>
            </Flex>
            <Flex w={'50%'}>
              <Text fontSize={'xl'} fontWeight={'medium'}>{props.observer.firstName} {props.observer.lastName}</Text>
              <Spacer />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}