import { Match } from 'entities/Match';
import { FormikModal } from 'components/matchPage/components/FormikModal';
import { useUserMatches } from 'hooks/useUserMatches';
import { uuid } from 'utils/uuid';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { InputControl } from 'formik-chakra-ui';
import { noteValidationSchema } from 'components/matchPage/sections/note/note.validation';

interface RefereeNoteEditModalProps {
  isOpen: boolean;
  handleClose: () => void;
  match: Match;
}

interface RefereeNoteFormikValues {
  refereeNote: string;
}

export const RefereeNoteEditModal = ({ isOpen, handleClose, match }: RefereeNoteEditModalProps) => {
  const { leagueId } = useParams<{ leagueId: uuid }>();
  const { updateRefereeNoteMutation: updateMutation } = useUserMatches({ leagueId: leagueId!, disableAutoRefetch: true });

  useEffect(() => {
    if (updateMutation.isSuccess) {
      handleClose();
      updateMutation.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialValues: RefereeNoteFormikValues = {
    refereeNote: '',
  }

  const handleUpdateRefereeNote = (values: RefereeNoteFormikValues) => {
    updateMutation.mutate({
      refereeNote: values.refereeNote,
      matchId: match.id,
    });
  };

  const modalBody: JSX.Element = (
    <>
      <InputControl name='refereeNote' label='Referee note' size={'md'} />
    </>
  );

  return (
    <FormikModal
      headingTitle={'Edit referee note'}
      body={modalBody}
      isOpen={isOpen}
      handleSubmit={handleUpdateRefereeNote}
      isLoading={updateMutation.isLoading}
      handleClose={handleClose}
      initialValues={initialValues}
      validationSchema={noteValidationSchema}
    />
  );
}