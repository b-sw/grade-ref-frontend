import {Badge, Button, Flex, Icon, Spacer} from "@chakra-ui/react"
import {MdWarning} from "react-icons/md"
import {IoIosShirt} from "react-icons/io"
import {Column} from "react-table";
import * as React from "react";
import {DataTable} from "components/shared/match/sections/DataTable";
import {Card, Foul} from "entities/Foul";
import {Team} from "entities/Team";
import {uuid} from "utils/uuid";
import {AddIcon} from '@chakra-ui/icons';
import {MatchData} from "components/shared/match/MatchOverviewPanel";
import {timeItem} from "components/adminDashboard/matches/MatchListItem";
import {useStore} from "zustandStore/store";
import {Role} from "utils/Role";
import {noRecords} from "components/shared/panelUtils";
import { SectionHeading } from "components/shared/match/shared/SectionHeading";

interface SanctionsProps {
  fouls: Foul[];
  teams: Team[];
}

export const Sanctions = ({ fouls, teams }: SanctionsProps) => {
  let mappedTeams: { [id: uuid]: Team } = {};
  const user = useStore((state) => state.user);

  teams.forEach((team) => mappedTeams[team.id] = team);

  const cols: Column<Foul>[] = [
    {
      Header: 'Minute',
      accessor: d => <Flex><Spacer />{timeItem(d.minute.toString())}<Spacer /></Flex>,
    },
    {
      Header: 'Card',
      accessor: d => <Badge colorScheme={d.card === Card.Red ? 'red' : 'yellow'} variant={'solid'}>{d.card}</Badge>
    },
    {
      Header: 'Player',
      accessor: d => <Flex alignItems={'center'}><IoIosShirt />{d.playerNumber}</Flex>,
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
      accessor: d => <Badge variant={'outline'} colorScheme={d.valid ? 'linkedin' : 'gray'}>{d.valid.toString()}</Badge>,
    },
  ];

  const userCanEdit: boolean = user.role === Role.Admin || user.role === Role.Observer;

  return (
    <Flex direction={'column'} w={'100%'} mb={5} gap={2}>
       <SectionHeading title={MatchData.DisciplinarySanctions} iconType={MdWarning}>
        <Button
          variant={'ghost'}
          leftIcon={<Icon as={AddIcon} />}
          onClick={() => {}}
          disabled={!userCanEdit}
        >
          Add
        </Button>
       </SectionHeading>

      <Flex
        direction={'column'}
        w={'100%'}
        borderRadius={10}
        backgroundColor={'gray.200'}
        p={5}
      >
        <DataTable columns={cols} data={fouls} />
        {!fouls.length && noRecords()}
      </Flex>
    </Flex>
  );
}