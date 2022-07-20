import {Badge, Button, Flex, Icon, Spacer, useDisclosure} from "@chakra-ui/react"
import {MdWarning} from "react-icons/md"
import {IoIosShirt} from "react-icons/io"
import {Column} from "react-table";
import * as React from "react";
import {DataTable} from "components/matchPage/sections/DataTable";
import {Card, Foul} from "entities/Foul";
import {Team} from "entities/Team";
import {uuid} from "utils/uuid";
import {AddIcon} from '@chakra-ui/icons';
import {MatchData} from "components/matchPage/MatchSectionsPanel";
import {timeItem} from "components/dashboard/matches/MatchListItem";
import {useStore} from "zustandStore/store";
import {Role} from "utils/Role";
import {NoRecords} from "components/utils/NoRecords";
import { SectionHeading } from "components/matchPage/components/SectionHeading";
import { SanctionAddModal } from 'components/matchPage/sections/sanctions/SanctionAddModal';
import { Match } from 'entities/Match';
import { SectionBody } from 'components/matchPage/components/SectionBody';
import { Section } from 'components/matchPage/components/Section';

interface SanctionsProps {
  fouls: Foul[];
  teams: Team[];
  match: Match;
}

export const Sanctions = ({ fouls, teams, match }: SanctionsProps) => {
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
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

  const userCanEdit: boolean = user.role === Role.Observer;

  return (
    <>
      {userCanEdit && <SanctionAddModal isOpen={isAddOpen} handleClose={onAddClose} match={match} />}

      <Section>
        <SectionHeading title={MatchData.DisciplinarySanctions} icon={<Icon as={MdWarning} boxSize={25}/>}>
          <Button
            variant={'ghost'}
            leftIcon={<Icon as={AddIcon} />}
            onClick={onAddOpen}
            disabled={!userCanEdit}
          >
            Add
          </Button>
        </SectionHeading>

        <SectionBody>
          <>
            <DataTable columns={cols} data={fouls} />
            {!fouls.length && NoRecords()}
          </>
        </SectionBody>
      </Section>
    </>
  );
}