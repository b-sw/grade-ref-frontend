import { Button, Icon, Text, useDisclosure } from "@chakra-ui/react";
import { MdGrade } from "react-icons/md";
import { AddIcon } from "@chakra-ui/icons";
import {DataTable} from "components/shared/match/sections/DataTable";
import {Feature, FeatureType} from "entities/Feature";
import { Column } from "react-table";
import {MatchData} from "components/shared/match/MatchOverviewPanel";
import {Role} from "utils/Role";
import {noRecords} from "components/shared/panelUtils";
import {useStore} from "zustandStore/store";
import { SectionHeading } from "components/shared/match/components/SectionHeading";
import { SectionBody } from 'components/shared/match/components/SectionBody';
import { Section } from 'components/shared/match/components/Section';
import { ConclusionAddModal } from 'components/shared/match/sections/conclusions/modals/ConclusionAddModal';
import { Match } from 'entities/Match';

interface ConclusionsProps {
  features: Feature[];
  match: Match;
}

export const Conclusions = ({ features, match }: ConclusionsProps) => {
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const user = useStore((state) => state.user);

  const cols: Column<Feature>[] = [
    {
      Header: 'Type',
      accessor: d => <Text fontWeight={'medium'} color={d.type === FeatureType.Positive ? 'green.500' : 'red.400'}>{d.type}</Text>
    },
    {
      Header: 'Description',
      accessor: 'description',
    },
  ];

  const userCanEdit: boolean = user.role === Role.Observer;

  return (
    <>
      {userCanEdit && <ConclusionAddModal isOpen={isAddOpen} handleClose={onAddClose} match={match} />}

      <Section>
        <SectionHeading title={MatchData.Conclusions} icon={<Icon as={MdGrade} boxSize={25} />}>
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
            <DataTable columns={cols} data={features} />
            {!features.length && noRecords()}
          </>
        </SectionBody>
      </Section>
    </>
  );
}