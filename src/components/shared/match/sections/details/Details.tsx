import { EditIcon, InfoIcon } from "@chakra-ui/icons";
import {Button, Flex, Spacer, Text, useDisclosure } from "@chakra-ui/react";
import dayjs from "dayjs";
import {Match} from "entities/Match";
import {Team} from "entities/Team";
import {Constants} from "utils/Constants";
import {DetailsEditModal} from "components/shared/match/sections/details/DetailsEditModal";
import {TextField} from "components/shared/match/shared/TextField";

interface DetailsProps {
  match: Match;
  homeTeam: Team;
  awayTeam: Team;
}

export const Details = ({ match, homeTeam, awayTeam }: DetailsProps) => {
  // const user = useStore((state) => state.user);
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const getReadableDatetime = (date: Date, format: string): string => {
    return date ? dayjs(date, Constants.DATETIME_FORMAT).format(format) : 'N/A';
  }

  const matchDate: string = getReadableDatetime(match.matchDate, 'DD-MM-YYYY');
  const matchTime: string = getReadableDatetime(match.matchDate, 'HH:mm');

  return (
    <>
      <DetailsEditModal isOpen={isEditOpen} handleClose={onEditClose} match={match} />
      <Flex direction={'column'} w={'100%'} mb={5} gap={2}>
        <Flex align={'center'} gap={2} mr={5}>
          <InfoIcon boxSize={25}/>
          <Text fontSize={'2xl'} fontWeight={'medium'}>Match details</Text>
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
            <TextField name={'date'} text={matchDate} />
            <TextField name={'time'} text={matchTime} />
            <TextField name={'stadium'} text={match.stadium} />
            <TextField name={'home team'} text={homeTeam.name} />
            <TextField name={'away team'} text={awayTeam.name} />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
