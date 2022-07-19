import {SelectControl} from 'formik-chakra-ui';
import {useEffect} from 'react';
import {Match} from "entities/Match";
import {uuid} from "utils/uuid";
import {useLeagueMatches} from "hooks/useLeagueMatches";
import {LoadingOverlay} from "pages/LoadingOverlay";
import {SelectOptions} from "components/matchPage/components/SelectOptions";
import {useLeagueUsers} from "hooks/useLeagueUsers";
import {Role} from "utils/Role";
import {assignmentsValidationSchema} from "components/matchPage/sections/assignments/assignments.validation";
import {FormikModal} from "components/matchPage/components/FormikModal";

interface AssignmentEditModalProps {
  isOpen: boolean;
  handleClose: () => void;
  match: Match;
}

interface AssignmentFormikValues {
  refereeId: uuid;
  observerId: uuid;
}

export const AssignmentEditModal = ({ isOpen, handleClose, match }: AssignmentEditModalProps) => {
  const { updateMutation } = useLeagueMatches();
  const { usersQuery: refereesQuery } = useLeagueUsers(Role.Referee);
  const { usersQuery: observersQuery } = useLeagueUsers(Role.Observer);

  useEffect(() => {
    if (updateMutation.isSuccess) {
      handleClose();
      updateMutation.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateMutation.isSuccess]);

  const initialValues: AssignmentFormikValues = {
    refereeId: match.refereeId,
    observerId: match.observerId,
  };

  const handleEditMatch = (values: AssignmentFormikValues) => {
    updateMutation.mutate({
      ...match,
      refereeId: values.refereeId,
      observerId: values.observerId,
    } as Match);
  };

  const modalBody: JSX.Element = (
    <>
      <SelectControl name='refereeId' label='Referee'>
        <SelectOptions data={refereesQuery.data!} labelProps={['firstName', 'lastName']} />
      </SelectControl>

      <SelectControl name='observerId' label='Observer'>
        <SelectOptions data={observersQuery.data!} labelProps={['firstName', 'lastName']} />
      </SelectControl>
    </>
  );

  const queriesAreLoading: boolean = [refereesQuery, observersQuery].some(query => query.isLoading);

  if (queriesAreLoading) {
    return <LoadingOverlay />;
  }

  return (
    <FormikModal
      headingTitle={'Edit assignments'}
      body={modalBody}
      isOpen={isOpen}
      handleSubmit={handleEditMatch}
      isLoading={updateMutation.isLoading}
      handleClose={handleClose}
      initialValues={initialValues}
      validationSchema={assignmentsValidationSchema}
    />
  );
};
