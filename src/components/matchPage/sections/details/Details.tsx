import { EditIcon, InfoIcon } from '@chakra-ui/icons';
import { Button, Flex, Icon, useDisclosure } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { Constants } from 'utils/Constants';
import { DetailsEditModal } from 'components/matchPage/sections/details/DetailsEditModal';
import { TextField } from 'components/matchPage/components/TextField';
import { Role } from 'utils/Role';
import { useStore } from 'zustandStore/store';
import { SectionHeading } from 'components/matchPage/components/SectionHeading';
import { MatchData } from 'components/matchPage/MatchSectionsPanel';
import { MatchInfoEnriched } from 'entities/MatchInfoEnriched';
import { useMatch } from 'hooks/useMatch';
import { Team } from 'entities/Team';
import { useLeagueTeams } from 'hooks/useLeagueTeams';

interface DetailsProps {
  match: MatchInfoEnriched;
}

export const Details = ({ match }: DetailsProps) => {
  const { query: matchQuery } = useMatch();
  const { query: teamsQuery } = useLeagueTeams();
  const user = useStore((state) => state.user);
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const getReadableDatetime = (date: Date, format: string): string => {
    return date ? dayjs(date, Constants.DATETIME_FORMAT).format(format) : 'N/A';
  };

  const handleEditOpen = async () => {
    await matchQuery.refetch();
    onEditOpen();
  };

  const homeTeam = teamsQuery.data!.find((team: Team) => team.id === match.homeTeamId)!;
  const awayTeam = teamsQuery.data!.find((team: Team) => team.id === match.awayTeamId)!;
  const matchDate: string = getReadableDatetime(match.matchDate, 'DD-MM-YYYY');
  const matchTime: string = getReadableDatetime(match.matchDate, 'HH:mm');

  const matchHasStarted: boolean = dayjs(match.matchDate).isBefore(dayjs());
  const userIsAdmin: boolean = user.role === Role.Admin;
  const userCanEdit: boolean = userIsAdmin && !matchHasStarted;

  return (
    <>
      {userCanEdit && matchQuery.data && <DetailsEditModal isOpen={isEditOpen} handleClose={onEditClose} />}

      <Flex direction={'column'} w={'100%'} mb={5} gap={2}>
        <SectionHeading title={MatchData.Details} icon={<InfoIcon boxSize={25} />}>
          <Button
            variant={'ghost'}
            leftIcon={<Icon as={EditIcon} />}
            onClick={handleEditOpen}
            disabled={!userCanEdit}
            isLoading={matchQuery.isLoading}
          >
            Edit
          </Button>
        </SectionHeading>

        <Flex direction={'column'} w={'100%'} borderRadius={10} backgroundColor={'gray.200'} p={5}>
          <Flex direction={'column'} pr={[0, 20]} gap={2}>
            <TextField name={'Date:'} text={matchDate} />
            <TextField name={'Time:'} text={matchTime} />
            <TextField name={'Stadium:'} text={match.stadium} />
            <TextField name={'Home team:'} text={homeTeam.name} />
            <TextField name={'Away team:'} text={awayTeam.name} />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
