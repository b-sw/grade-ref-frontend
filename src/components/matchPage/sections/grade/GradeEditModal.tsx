import { FormikModal } from 'components/matchPage/components/FormikModal';
import { useEffect } from 'react';
import { NumberInputControl } from 'formik-chakra-ui';
import { gradeValidationSchema } from 'components/matchPage/sections/grade/grade.validation';
import { useGrades } from 'hooks/useGrades';
import { MatchInfoEnriched } from 'entities/MatchInfoEnriched';
import { useTranslation } from 'react-i18next';

interface GradeEditModalProps {
  isOpen: boolean;
  handleClose: () => void;
  match: MatchInfoEnriched;
}

interface GradeFormikValues {
  refereeGrade: number;
}

export const GradeEditModal = ({ isOpen, handleClose, match }: GradeEditModalProps) => {
  const { updateGradeMutation: updateMutation } = useGrades({ matchId: match.id });
  const { t } = useTranslation();

  useEffect(() => {
    if (updateMutation.isSuccess) {
      handleClose();
      updateMutation.reset();
    }
  }, [updateMutation.isSuccess]);

  const initialValues: GradeFormikValues = {
    refereeGrade: match.refereeGrade ?? 0,
  };

  const handleEditGrade = (values: GradeFormikValues) => {
    updateMutation.mutate({
      ...match,
      refereeGrade: values.refereeGrade,
    } as MatchInfoEnriched);
  };

  const modalBody: JSX.Element = (
    <>
      <NumberInputControl name="refereeGrade" label={t('matchPage.grade.editModal.input')} />
    </>
  );

  return (
    <FormikModal
      headingTitle={t('matchPage.grade.editModal.title')}
      body={modalBody}
      isOpen={isOpen}
      handleSubmit={handleEditGrade}
      isLoading={updateMutation.isLoading}
      handleClose={handleClose}
      initialValues={initialValues}
      validationSchema={gradeValidationSchema}
    />
  );
};
