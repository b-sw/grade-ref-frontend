import {Badge, Button, Flex, Icon, Spacer, useDisclosure} from "@chakra-ui/react"
import {MdWarning} from "react-icons/md"
import {IoIosShirt} from "react-icons/io"
import {Column} from "react-table";
import * as React from "react";
import {DataTable} from "components/matchPage/components/DataTable";
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
import { SanctionAddModal } from 'components/matchPage/sections/sanctions/modals/SanctionAddModal';
import { SectionBody } from 'components/matchPage/components/SectionBody';
import { Section } from 'components/matchPage/components/Section';
import { useMatchFouls } from 'components/matchPage/sections/sanctions/useMatchFouls';
import { SanctionEditModal } from 'components/matchPage/sections/sanctions/modals/SanctionEditModal';

interface SanctionsProps {
  teams: Team[];
}

export const Sanctions = ({ teams }: SanctionsProps) => {
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { query: foulsQuery, deleteMutation } = useMatchFouls();
  let mappedTeams: { [id: uuid]: Team } = {};
  const user = useStore((state) => state.user);

  teams.forEach((team) => mappedTeams[team.id] = team);

  const cols: Column<Foul>[] = [
    {
      Header: 'Minute',
      accessor: (d) => d.minute,
      Cell: (props: any) => <Flex><Spacer />{timeItem(props.value.toString())}<Spacer /></Flex>,
    },
    {
      Header: 'Card',
      accessor: d => d.card,
      Cell: (props: any) =>
        <Badge colorScheme={props.value === Card.Red ? 'red' : 'yellow'} variant={'solid'}>{props.value}</Badge>,
    },
    {
      Header: 'Player',
      accessor: d => d.playerNumber,
      Cell: (props: any) => <Flex alignItems={'center'}><IoIosShirt />{props.value}</Flex>,
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
      Cell: (props: any) =>
        <Badge variant={'outline'} colorScheme={props.value === 'true' ? 'linkedin' : 'gray'}>{props.value}</Badge>,
    },
  ];

  const userCanEdit: boolean = user.role === Role.Observer;

  return (
    <>
      {userCanEdit && <SanctionAddModal isOpen={isAddOpen} handleClose={onAddClose} />}

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
            <DataTable
              columns={cols}
              data={foulsQuery.data!}
              readOnly={!userCanEdit}
              deleteMutation={deleteMutation}
              EditModal={SanctionEditModal}
            />
            {!foulsQuery.data!.length && NoRecords()}
          </>
        </SectionBody>
      </Section>
    </>
  );
}