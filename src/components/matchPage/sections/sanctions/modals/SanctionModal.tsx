import { FormikModal } from 'components/matchPage/components/FormikModal';
import { useEffect } from 'react';
import { uuid } from 'utils/uuid';
import { Card, Foul } from 'entities/Foul';
import { sanctionsValidationSchema } from 'components/matchPage/sections/sanctions/sanctions.validation';
import { InputControl, NumberInputControl, SelectControl } from 'formik-chakra-ui';
import { SelectOptions, SelectOptionsConstant } from 'components/matchPage/components/SelectOptions';
import { useLeagueTeams } from 'hooks/useLeagueTeams';
import { Team } from 'entities/Team';
import { AxiosError } from 'axios';
import { UseMutationResult } from 'react-query';
import { MatchInfoEnriched } from 'entities/MatchInfoEnriched';

interface SanctionsModalProps {
  isOpen: boolean;
  handleClose: () => void;
  match: MatchInfoEnriched;
  mutation: UseMutationResult<Foul, AxiosError<unknown, any>, Foul, unknown>;
  foul?: Foul;
}

interface SanctionFormikValues {
  minute: number;
  card: Card;
  playerNumber: number;
  description: string;
  valid: boolean;
  teamId: uuid;
}

export const SanctionModal = ({ isOpen, handleClose, match, mutation, foul }: SanctionsModalProps) => {
  const { query: teamsQuery } = useLeagueTeams();

  useEffect(() => {
    if (mutation.isSuccess) {
      handleClose();
      mutation.reset();
    }
  }, [mutation.isSuccess]);

  const initialValues: SanctionFormikValues = {
    minute: foul ? foul.minute : 0,
    card: foul ? foul.card : Card.Red,
    playerNumber: foul ? foul.playerNumber : 0,
    description: foul ? foul.description : '',
    valid: foul ? foul.valid : true,
    teamId: foul ? foul.teamId : match.homeTeamId,
  };

  const handleMutate = (values: SanctionFormikValues) => {
    mutation.mutate({
      ...values,
      matchId: match.id,
      id: foul?.id,
    } as Foul);
  };

  const homeTeam = teamsQuery.data!.find((team: Team) => team.id === match.homeTeamId)!;
  const awayTeam = teamsQuery.data!.find((team: Team) => team.id === match.awayTeamId)!;

  const modalBody: JSX.Element = (
    <>
      <NumberInputControl name="minute" label="Minute" />

      <SelectControl name="card" label="Card">
        <SelectOptionsConstant valuesMap={{ [Card.Red]: Card.Red, [Card.Yellow]: Card.Yellow }} />
      </SelectControl>

      <NumberInputControl name="playerNumber" label="Player number" />

      <SelectControl name="teamId" label="Team">
        <SelectOptions data={[homeTeam, awayTeam]} labelProps={['name']} />
      </SelectControl>

      <InputControl name="description" label="Description" />

      <SelectControl name="valid" label="Valid">
        <SelectOptionsConstant valuesMap={{ true: true, false: false }} />
      </SelectControl>
    </>
  );

  return (
    <FormikModal
      headingTitle={foul ? 'Edit' : 'Add' + ' disciplinary sanction'}
      body={modalBody}
      isOpen={isOpen}
      handleSubmit={handleMutate}
      isLoading={mutation.isLoading}
      handleClose={handleClose}
      initialValues={initialValues}
      validationSchema={sanctionsValidationSchema}
    />
  );
};
