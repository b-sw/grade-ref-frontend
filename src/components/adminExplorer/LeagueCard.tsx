import {Avatar, Button, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {Paths} from '../../other/Paths';
import {League} from "../../entities/League";

interface Props {
  league: League;
}

export const LeagueCard = (props: Props) => {
  const navigate = useNavigate();

  const navigateToDashboard = (league: League) => {
    navigate(`${Paths.ADMIN_DASHBOARD}/${league.id}`);
  };

  return (
    <Flex borderRadius={5} p={5} backgroundColor={'gray.300'} shadow={'md'} w={['80%', '80%', '20%']}>
      <VStack alignItems={'baseline'} w={'100%'}>
        {leagueItem(props.league)}
        <Button w={'100%'} onClick={() => navigateToDashboard(props.league)}>
          Select
        </Button>
      </VStack>
    </Flex>
  );
};

export const leagueItem = (league: League) => {
  return (
    <>
      <HStack py={2}>
        <Avatar
          name={league.name}
          size={'md'}
        />
        <VStack spacing={0} alignItems={'baseline'}>
          <Text><b>{league.name}</b></Text>
          <Text fontSize={'sm'} color={'gray.500'}>
            {league.country}
          </Text>
        </VStack>
      </HStack>
    </>
  );
}
