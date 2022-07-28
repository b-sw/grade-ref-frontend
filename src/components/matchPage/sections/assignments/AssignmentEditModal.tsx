import { SelectControl } from 'formik-chakra-ui';
import { useEffect } from 'react';
import { uuid } from 'utils/uuid';
import { LoadingOverlay } from 'pages/LoadingOverlay';
import { SelectOptions } from 'components/matchPage/components/SelectOptions';
import { useLeagueUsers } from 'hooks/useLeagueUsers';
import { Role } from 'utils/Role';
import { assignmentsValidationSchema } from 'components/matchPage/sections/assignments/assignments.validation';
import { FormikModal } from 'components/matchPage/components/FormikModal';
import { useMatch } from 'hooks/useMatch';
import { Match } from 'entities/Match';

interface AssignmentEditModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

interface AssignmentFormikValues {
  refereeId: uuid;
  observerId: uuid;
}

export const AssignmentEditModal = ({ isOpen, handleClose }: AssignmentEditModalProps) => {
  const { query: matchQuery, updateMatchMutation: updateMutation } = useMatch();
  const { usersQuery: refereesQuery } = useLeagueUsers(Role.Referee);
  const { usersQuery: observersQuery } = useLeagueUsers(Role.Observer);

  useEffect(() => {
    if (updateMutation.isSuccess) {
      handleClose();
      updateMutation.reset();
    }
  }, [updateMutation.isSuccess]);

  const initialValues: AssignmentFormikValues = {
    refereeId: matchQuery.data!.refereeId,
    observerId: matchQuery.data!.observerId,
  };

  const handleEditMatch = (values: AssignmentFormikValues) => {
    updateMutation.mutate({
      ...matchQuery.data!,
      refereeId: values.refereeId,
      observerId: values.observerId,
    } as Match);
  };

  const modalBody: JSX.Element = (
    <>
      <SelectControl name="refereeId" label="Referee">
        <SelectOptions data={refereesQuery.data!} labelProps={['firstName', 'lastName']} />
      </SelectControl>

      <SelectControl name="observerId" label="Observer">
        <SelectOptions data={observersQuery.data!} labelProps={['firstName', 'lastName']} />
      </SelectControl>
    </>
  );

  const queriesAreLoading: boolean = [refereesQuery, observersQuery].some((query) => query.isLoading);

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
