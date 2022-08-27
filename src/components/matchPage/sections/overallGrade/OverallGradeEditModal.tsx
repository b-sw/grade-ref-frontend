import { FormikModal } from 'components/matchPage/components/FormikModal';
import { useEffect } from 'react';
import { TextareaControl } from 'formik-chakra-ui';
import { useGrades } from 'hooks/useGrades';
import { overallGradeValidationSchema } from 'components/matchPage/sections/overallGrade/overall-grade.validation';
import { MatchInfoEnriched } from 'entities/MatchInfoEnriched';
import { useTranslation } from 'react-i18next';

interface OverallGradeEditModalProps {
    isOpen: boolean;
    handleClose: () => void;
    match: MatchInfoEnriched;
}

interface GradeFormikValues {
    overallGrade: string;
}

export const OverallGradeEditModal = ({ isOpen, handleClose, match }: OverallGradeEditModalProps) => {
    const { updateOverallGradeMutation: updateMutation } = useGrades();
    const { t } = useTranslation();

    useEffect(() => {
        if (updateMutation.isSuccess) {
            handleClose();
            updateMutation.reset();
        }
    }, [updateMutation.isSuccess]);

    const initialValues: GradeFormikValues = {
        overallGrade: match.overallGrade ?? '',
    };

    const handleEditGrade = (values: GradeFormikValues) => {
        updateMutation.mutate({
            overallGrade: values.overallGrade,
        } as MatchInfoEnriched);
    };

    const modalBody: JSX.Element = (
        <>
            <TextareaControl
                name="overallGrade"
                label={t('matchPage.overallGrade.editModal.textArea')}
                textareaProps={
                    {
                        rows: 30,
                        resize: 'none',
                        whiteSpace: 'pre-wrap',
                    } as any
                }
            />
        </>
    );

    return (
        <FormikModal
            headingTitle={t('matchPage.overallGrade.editModal.title')}
            body={modalBody}
            isOpen={isOpen}
            handleSubmit={handleEditGrade}
            isLoading={updateMutation.isLoading}
            handleClose={handleClose}
            initialValues={initialValues}
            validationSchema={overallGradeValidationSchema}
            size={'3xl'}
        />
    );
};
