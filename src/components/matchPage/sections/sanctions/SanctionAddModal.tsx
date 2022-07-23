import { Match } from "entities/Match";
import { FormikModal } from "components/matchPage/components/FormikModal";
import { useMatchFouls } from "components/matchPage/sections/sanctions/useMatchFouls";
import { useEffect } from "react";
import { uuid } from 'utils/uuid';
import { Card, Foul } from 'entities/Foul';
import { sanctionsValidationSchema } from "components/matchPage/sections/sanctions/sanctions.validation";
import { InputControl, NumberInputControl, SelectControl } from "formik-chakra-ui";
import { SelectOptions, SelectOptionsConstant } from 'components/matchPage/components/SelectOptions';
import { useLeagueTeams } from 'hooks/useLeagueTeams';
import { Team } from 'entities/Team';

interface SanctionAddModalProps {
  isOpen: boolean;
  handleClose: () => void;
  match: Match;
}

interface SanctionFormikValues {
  minute: number;
  card: Card;
  playerNumber: number;
  description: string;
  valid: boolean;
  teamId: uuid;
}

export const SanctionAddModal = ({ isOpen, handleClose, match }: SanctionAddModalProps) => {
  const { query: teamsQuery } = useLeagueTeams();
  const { postMutation } = useMatchFouls();

  useEffect(() => {
    if (postMutation.isSuccess) {
      handleClose();
      postMutation.reset();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postMutation.isSuccess]);

  const initialValues: SanctionFormikValues = {
    minute: 0,
    card: Card.Red,
    playerNumber: 0,
    description: '',
    valid: true,
    teamId: match.homeTeamId,
  }

  const handleCreateFoul = (values: SanctionFormikValues) => {
    postMutation.mutate({
      ...values,
      matchId: match.id,
    } as Foul);
  };

  const homeTeam = teamsQuery.data!.find((team: Team) => team.id === match.homeTeamId)!;
  const awayTeam = teamsQuery.data!.find((team: Team) => team.id === match.awayTeamId)!;

  const modalBody: JSX.Element = (
    <>
      <NumberInputControl name='minute' label='Minute' />

      <SelectControl name='card' label='Card'>
        <SelectOptionsConstant valuesMap={{ [Card.Red]: Card.Red, [Card.Yellow]: Card.Yellow }} />
      </SelectControl>

      <NumberInputControl name='playerNumber' label='Player number' />

      <SelectControl name='teamId' label='Team'>
        <SelectOptions data={[homeTeam, awayTeam]} labelProps={['name']} />
      </SelectControl>

      <InputControl name='description' label='Description' />

      <SelectControl name='valid' label='Valid'>
        <SelectOptionsConstant valuesMap={{ 'true': true, 'false': false }} />
      </SelectControl>
    </>
  );

  return (
    <FormikModal
      headingTitle={'Add disciplinary sanction'}
      body={modalBody}
      isOpen={isOpen}
      handleSubmit={handleCreateFoul}
      isLoading={postMutation.isLoading}
      handleClose={handleClose}
      initialValues={initialValues}
      validationSchema={sanctionsValidationSchema}
    />
  );
};
