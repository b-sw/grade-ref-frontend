import { Match } from 'entities/Match';
import { FormikModal } from 'components/matchPage/components/FormikModal';
import { useEffect } from 'react';
import { TextareaControl } from 'formik-chakra-ui';
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
    refereeNote: match.refereeNote ?? 'N/A',
  }

  const handleUpdateRefereeNote = (values: RefereeNoteFormikValues) => {
    updateMutation.mutate({
      refereeNote: values.refereeNote,
      matchId: match.id,
    });
  };

  const modalBody: JSX.Element = (
    <TextareaControl
      name='refereeNote'
      label='Referee note'
      textareaProps={{
        rows: 15,
        resize: 'none',
        whiteSpace: 'pre-wrap',
        } as any
      }
    />
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