import { Button, Icon, Text, useDisclosure } from "@chakra-ui/react";
import { MdGrade } from "react-icons/md";
import { AddIcon } from "@chakra-ui/icons";
import {DataTable} from "components/matchPage/components/DataTable";
import {Feature, FeatureType} from "entities/Feature";
import { Column } from "react-table";
import {MatchData} from "components/matchPage/MatchSectionsPanel";
import {Role} from "utils/Role";
import {NoRecords} from "components/utils/NoRecords";
import {useStore} from "zustandStore/store";
import { SectionHeading } from "components/matchPage/components/SectionHeading";
import { SectionBody } from 'components/matchPage/components/SectionBody';
import { Section } from 'components/matchPage/components/Section';
import { ConclusionAddModal } from 'components/matchPage/sections/conclusions/ConclusionAddModal';
import { Match } from 'entities/Match';
import { useMatchFeatures } from 'components/matchPage/sections/conclusions/useMatchFeatures';

interface ConclusionsProps {
  match: Match;
}

export const Conclusions = ({ match }: ConclusionsProps) => {
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { query: featuresQuery, deleteMutation } = useMatchFeatures();
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
            <DataTable
              columns={cols}
              data={featuresQuery.data!}
              readOnly={!userCanEdit}
              deleteMutation={deleteMutation}
            />
            {!featuresQuery.data!.length && NoRecords()}
          </>
        </SectionBody>
      </Section>
    </>
  );
}