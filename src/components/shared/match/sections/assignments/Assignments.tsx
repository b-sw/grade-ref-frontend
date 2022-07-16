import {User} from "entities/User";
import {Match} from "entities/Match";
import {Button, Flex, Spacer, Text, useDisclosure} from "@chakra-ui/react";
import { MdPeople } from "react-icons/md";
import { EditIcon } from "@chakra-ui/icons";
import {MatchData} from "components/shared/match/MatchOverviewPanel";
import {AssignmentsEditModal} from "components/shared/match/sections/assignments/AssignmentsEditModal";
import {TextField} from "components/shared/match/shared/TextField";

interface Props {
  match: Match;
  referee: User;
  observer: User;
}

export const Assignments = ({ match, referee, observer }: Props) => {
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();

  return (
    <>
      <AssignmentsEditModal isOpen={isEditOpen} handleClose={onEditClose} match={match} />

      <Flex direction={'column'} w={'100%'} mb={5} gap={2}>
        <Flex align={'center'} gap={2} mr={5}>
          <MdPeople size={'25'}/>
          <Text fontSize={'2xl'} fontWeight={'medium'}>{MatchData.Assignments}</Text>
          <Spacer />
          <Button
            variant={'ghost'}
            leftIcon={<EditIcon />}
            onClick={onEditOpen}
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
            <TextField name={'referee'} text={[referee.firstName, referee.lastName].join(' ')} />
            <TextField name={'observer'} text={[observer.firstName, observer.lastName].join(' ')} />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}