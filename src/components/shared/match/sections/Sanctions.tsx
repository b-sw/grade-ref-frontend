import {Button, Flex, Spacer, Text } from "@chakra-ui/react"
import { MdWarning } from "react-icons/md"
import {Match} from "entities/Match";
import { Column } from "react-table";
import * as React from "react";
import {DataTable} from "components/shared/match/sections/DataTable";
import {Foul} from "entities/Foul";
import {Team} from "entities/Team";
import {uuid} from "utils/uuid";
import { AddIcon } from '@chakra-ui/icons';
import {MatchData} from "components/shared/match/MatchOverviewPanel";

interface Props {
  match: Match;
  fouls: Foul[];
  teams: Team[];
}

export const Sanctions = (props: Props) => {
  let mappedTeams: { [id: uuid]: Team } = {};
  props.teams.forEach((team) => mappedTeams[team.id] = team);

  const cols: Column<Foul>[] = [
    {
      Header: 'Minute',
      accessor: 'minute',
    },
    {
      Header: 'Card',
      accessor: 'card',
    },
    {
      Header: 'Player',
      accessor: 'playerNumber',
    },
    {
      Header: 'Team',
      accessor: d => mappedTeams[d.teamId].name,
    },
    {
      Header: 'Description',
      accessor: 'description',
    },
    {
      id: 'valid',
      Header: 'Valid',
      accessor: d => d.valid.toString(),
    },
  ];

  return (
    <Flex direction={'column'} w={'100%'} mb={5} gap={2}>
      <Flex align={'center'} gap={2}>
        <MdWarning size={'25'}/>
        <Text fontSize={'2xl'} fontWeight={'medium'}>{MatchData.DisciplinarySanctions}</Text>
        <Spacer />
        <Button
          variant={'ghost'}
          leftIcon={<AddIcon />}
          onClick={() => {}}
        >
          Add
        </Button>
      </Flex>

      <Flex
        direction={'column'}
        w={'100%'}
        borderRadius={10}
        backgroundColor={'gray.200'}
        p={5}
      >
        <DataTable columns={cols} data={props.fouls} />
      </Flex>
    </Flex>
  );
}