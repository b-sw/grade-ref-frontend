import { Match } from 'entities/Match';
import { FormikModal } from 'components/matchPage/components/FormikModal';
import { useUserMatches } from 'hooks/useUserMatches';
import { useEffect } from 'react';
import { InputControl } from 'formik-chakra-ui';
import { noteValidationSchema } from 'components/matchPage/sections/note/note.validation';
import { useLeagueMatch } from 'hooks/useLeagueMatch';

interface RefereeNoteEditModalProps {
  isOpen: boolean;
  handleClose: () => void;
  match: Match;
}

interface RefereeNoteFormikValues {
  refereeNote: string;
}

export const RefereeNoteEditModal = ({ isOpen, handleClose, match }: RefereeNoteEditModalProps) => {
  const { updateRefereeNoteMutation: updateMutation } = useLeagueMatch();

  useEffect(() => {
    if (updateMutation.isSuccess) {
      handleClose();
      updateMutation.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateMutation.isSuccess]);

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