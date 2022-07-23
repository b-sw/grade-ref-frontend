import { InputControl, SelectControl } from 'formik-chakra-ui';
import { useEffect } from 'react';
import {Match} from "entities/Match";
import {uuid} from "utils/uuid";
import {useLeagueMatches} from "hooks/useLeagueMatches";
import {useLeagueTeams} from "hooks/useLeagueTeams";
import {Constants, FORMIK_DATETIME_FORMAT} from "utils/Constants";
import dayjs from 'dayjs';
import {detailsValidationSchema} from "components/matchPage/sections/details/details.validation";
import {LoadingOverlay} from "pages/LoadingOverlay";
import {SelectOptions} from "components/matchPage/components/SelectOptions";
import {FormikModal} from "components/matchPage/components/FormikModal";
import { useLeagueMatch } from 'hooks/useLeagueMatch';

interface DetailsEditModalProps {
  isOpen: boolean;
  handleClose: () => void;
  match: Match;
}

interface DetailsFormikValues {
  date: string;
  stadium: string;
  homeTeamId: uuid;
  awayTeamId: uuid;
}

export const DetailsEditModal = ({ isOpen, handleClose, match }: DetailsEditModalProps) => {
  const { updateMatchMutation: updateMutation } = useLeagueMatch();
  const { query: teamsQuery } = useLeagueTeams();

  useEffect(() => {
    if (updateMutation.isSuccess) {
      handleClose();
      updateMutation.reset();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateMutation.isSuccess]);

  const initialValues: DetailsFormikValues = {
    date: dayjs(match.matchDate).format(FORMIK_DATETIME_FORMAT),
    stadium: match.stadium,
    homeTeamId: match.homeTeamId,
    awayTeamId: match.awayTeamId,
  };

  const handleEditMatch = (values: DetailsFormikValues) => {
    const newMatchDate: Date = dayjs(values.date, Constants.DATETIME_FORMAT).toDate();

    updateMutation.mutate({
      ...match,
      matchDate: newMatchDate,
      stadium: values.stadium,
      homeTeamId: values.homeTeamId,
      awayTeamId: values.awayTeamId,
    } as Match);
  };

  const modalBody: JSX.Element = (
    <>
      <InputControl name='date' label='Date' inputProps={{ type: 'datetime-local' }} />

      <InputControl name='stadium' label='Stadium' />

      <SelectControl name='homeTeamId' label='Home team'>
        <SelectOptions data={teamsQuery.data!} labelProps={['name']} />
      </SelectControl>

      <SelectControl name='awayTeamId' label='Away team'>
        <SelectOptions data={teamsQuery.data!} labelProps={['name']} />
      </SelectControl>
    </>
  );

  if (teamsQuery.isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <FormikModal
      headingTitle={'Edit match details'}
      body={modalBody}
      isOpen={isOpen}
      handleSubmit={handleEditMatch}
      isLoading={updateMutation.isLoading}
      handleClose={handleClose}
      initialValues={initialValues}
      validationSchema={detailsValidationSchema}
    />
  );
};
