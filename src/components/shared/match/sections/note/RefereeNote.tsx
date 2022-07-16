import {Button, Flex, Icon, Spacer, Text, Textarea } from "@chakra-ui/react"
import {Match} from "entities/Match";
import {MatchData} from "components/shared/match/MatchOverviewPanel";
import { MdNote } from "react-icons/md";
import { EditIcon } from "@chakra-ui/icons";
import {useStore} from "zustandStore/store";
import {Role} from "utils/Role";

interface Props {
  match: Match;
}

export const RefereeNote = (props: Props) => {
  const user = useStore((state) => state.user);

  const userCanEdit: boolean = user.role === Role.Referee;

  return (
    <Flex direction={'column'} w={'100%'} mb={5} gap={2}>
      <Flex align={'center'} gap={2} mr={5}>
        <Icon as={MdNote} />
        <Text fontSize={'2xl'} fontWeight={'medium'}>{MatchData.RefereeNote}</Text>
        <Spacer />
        <Button
          variant={'ghost'}
          leftIcon={<Icon as={EditIcon} />}
          onClick={() => {}}
          disabled={!userCanEdit}
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
        <Flex>
          <Spacer />
          <Textarea
            w={['100%', '50%']}
            isReadOnly={true}
            resize={'none'}
            value={props.match.refereeNote ?? 'N/A'}
            borderColor={'gray.400'}
            focusBorderColor={'gray.400'}
            backgroundColor={'gray.100'}
            _hover={{}}
          />
          <Spacer />
        </Flex>
      </Flex>
    </Flex>
  );
}