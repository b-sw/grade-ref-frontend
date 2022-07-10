import { Flex, Spacer, Text, Textarea } from "@chakra-ui/react"
import {Match} from "entities/Match";
import {MatchData} from "components/shared/match/MatchOverviewPanel";
import { MdNote } from "react-icons/md";

interface Props {
  match: Match;
}

export const RefereeNote = (props: Props) => {
  return (
    <Flex direction={'column'} w={'100%'} mb={5} gap={2}>
      <Flex align={'center'} gap={2}>
        <MdNote size={'25'}/>
        <Text fontSize={'2xl'} fontWeight={'medium'}>{MatchData.RefereeNote}</Text>
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
            value={props.match.refereeNote}
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