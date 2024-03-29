import { FormikModal } from 'components/matchPage/components/FormikModal';
import { useEffect } from 'react';
import { TextareaControl } from 'formik-chakra-ui';
import { noteValidationSchema } from 'components/matchPage/sections/note/note.validation';
import { useLeagueMatch } from 'hooks/useLeagueMatch';
import { MatchInfoEnriched } from 'entities/MatchInfoEnriched';
import { useTranslation } from 'react-i18next';

interface RefereeNoteEditModalProps {
    isOpen: boolean;
    handleClose: () => void;
    match: MatchInfoEnriched;
}

interface RefereeNoteFormikValues {
    refereeNote: string;
}

export const RefereeNoteEditModal = ({ isOpen, handleClose, match }: RefereeNoteEditModalProps) => {
    const { updateRefereeNoteMutation: updateMutation } = useLeagueMatch();
    const { t } = useTranslation();

    useEffect(() => {
        if (updateMutation.isSuccess) {
            handleClose();
            updateMutation.reset();
        }
    }, [updateMutation.isSuccess]);

    const initialValues: RefereeNoteFormikValues = {
        refereeNote: match.refereeNote ?? 'N/A',
    };

    const handleUpdateRefereeNote = (values: RefereeNoteFormikValues) => {
        updateMutation.mutate({
            refereeNote: values.refereeNote,
            matchId: match.id,
        });
    };

    const modalBody: JSX.Element = (
        <TextareaControl
            name="refereeNote"
            label={t('matchPage.note.title')}
            textareaProps={
                {
                    rows: 15,
                    resize: 'none',
                    whiteSpace: 'pre-wrap',
                } as any
            }
        />
    );

    return (
        <FormikModal
            headingTitle={t('matchPage.note.editModal.title')}
            body={modalBody}
            isOpen={isOpen}
            handleSubmit={handleUpdateRefereeNote}
            isLoading={updateMutation.isLoading}
            handleClose={handleClose}
            initialValues={initialValues}
            validationSchema={noteValidationSchema}
        />
    );
};
