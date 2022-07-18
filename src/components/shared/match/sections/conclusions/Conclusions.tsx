import { Button, Flex, Icon, Text } from "@chakra-ui/react";
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

interface ConclusionsProps {
  features: Feature[];
}

export const Conclusions = ({ features }: ConclusionsProps) => {
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

  const userCanEdit: boolean = user.role === Role.Admin || user.role === Role.Observer;

  return (
    <Flex direction={'column'} w={'100%'} mb={5} gap={2}>
      <SectionHeading title={MatchData.Conclusions} icon={<Icon as={MdGrade} boxSize={25} />}>
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
        <DataTable columns={cols} data={features} />
        {!features.length && noRecords()}
      </Flex>
    </Flex>
  );
}