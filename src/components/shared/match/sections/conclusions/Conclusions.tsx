import { Button, Flex, Spacer, Text } from "@chakra-ui/react";
import { MdGrade } from "react-icons/md";
import {Match} from "entities/Match";
import { AddIcon } from "@chakra-ui/icons";
import {DataTable} from "components/shared/match/sections/DataTable";
import {Feature, FeatureType} from "entities/Feature";
import { Column } from "react-table";
import {MatchData} from "components/shared/match/MatchOverviewPanel";
import {Role} from "utils/Role";
import {noRecords} from "components/shared/panelUtils";
import {useStore} from "zustandStore/store";

interface Props {
  match: Match;
  features: Feature[];
}

export const Conclusions = (props: Props) => {
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

  return (
    <Flex direction={'column'} w={'100%'} mb={5} gap={2}>
      <Flex align={'center'} gap={2} mr={5}>
        <MdGrade size={'25'}/>
        <Text fontSize={'2xl'} fontWeight={'medium'}>{MatchData.Conclusions}</Text>
        <Spacer />
        {user.role === Role.Referee &&
          <Button
            variant={'ghost'}
            leftIcon={<AddIcon />}
            onClick={() => {}}
          >
            Add
          </Button>
        }
      </Flex>

      <Flex
        direction={'column'}
        w={'100%'}
        borderRadius={10}
        backgroundColor={'gray.200'}
        p={5}
      >
        <DataTable columns={cols} data={props.features} />
        {!props.features.length && noRecords()}
      </Flex>
    </Flex>
  );
}