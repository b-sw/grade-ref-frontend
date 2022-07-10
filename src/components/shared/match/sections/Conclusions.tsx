import {Button, Flex, Spacer, Text } from "@chakra-ui/react";
import { MdGrade } from "react-icons/md";
import {Match} from "entities/Match";
import { AddIcon } from "@chakra-ui/icons";
import {DataTable} from "components/shared/match/sections/DataTable";
import {Feature} from "entities/Feature";
import { Column } from "react-table";
import {MatchData} from "components/shared/match/MatchOverviewPanel";

interface Props {
  match: Match;
  features: Feature[];
}

export const Conclusions = (props: Props) => {
  const cols: Column<Feature>[] = [
    {
      Header: 'Type',
      accessor: 'type',
    },
    {
      Header: 'Description',
      accessor: 'description',
    },
  ];

  return (
    <Flex direction={'column'} w={'100%'} mb={5} gap={2}>
      <Flex align={'center'} gap={2}>
        <MdGrade size={'25'}/>
        <Text fontSize={'2xl'} fontWeight={'medium'}>{MatchData.Conclusions}</Text>
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
        <DataTable columns={cols} data={props.features} />
      </Flex>
    </Flex>
  );
}