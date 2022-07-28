import { InputControl, SelectControl } from 'formik-chakra-ui';
import { useEffect } from 'react';
import { uuid } from 'utils/uuid';
import { useLeagueTeams } from 'hooks/useLeagueTeams';
import { Constants, FORMIK_DATETIME_FORMAT } from 'utils/Constants';
import dayjs from 'dayjs';
import { detailsValidationSchema } from 'components/matchPage/sections/details/details.validation';
import { LoadingOverlay } from 'pages/LoadingOverlay';
import { SelectOptions } from 'components/matchPage/components/SelectOptions';
import { FormikModal } from 'components/matchPage/components/FormikModal';
import { useMatch } from 'hooks/useMatch';
import { Match } from 'entities/Match';

interface DetailsEditModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

interface DetailsFormikValues {
  date: string;
  stadium: string;
  homeTeamId: uuid;
  awayTeamId: uuid;
}

export const DetailsEditModal = ({ isOpen, handleClose }: DetailsEditModalProps) => {
  const { query: matchQuery, updateMatchMutation: updateMutation } = useMatch();
  const { query: teamsQuery } = useLeagueTeams();

  useEffect(() => {
    if (updateMutation.isSuccess) {
      handleClose();
      updateMutation.reset();
    }
  }, [updateMutation.isSuccess]);

  const initialValues: DetailsFormikValues = {
    date: dayjs(matchQuery.data!.matchDate).format(FORMIK_DATETIME_FORMAT),
    stadium: matchQuery.data!.stadium,
    homeTeamId: matchQuery.data!.homeTeamId,
    awayTeamId: matchQuery.data!.awayTeamId,
  };

  const handleEditMatch = (values: DetailsFormikValues) => {
    const newMatchDate: Date = dayjs(values.date, Constants.DATETIME_FORMAT).toDate();

    updateMutation.mutate({
      ...matchQuery.data!,
      matchDate: newMatchDate,
      stadium: values.stadium,
      homeTeamId: values.homeTeamId,
      awayTeamId: values.awayTeamId,
    } as Match);
  };

  const modalBody: JSX.Element = (
    <>
      <InputControl name="date" label="Date" inputProps={{ type: 'datetime-local' }} />

      <InputControl name="stadium" label="Stadium" />

      <SelectControl name="homeTeamId" label="Home team">
        <SelectOptions data={teamsQuery.data!} labelProps={['name']} />
      </SelectControl>

      <SelectControl name="awayTeamId" label="Away team">
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
