import {Match} from "entities/Match";
import {FormikModal} from "components/matchPage/components/FormikModal";
import {useEffect} from "react";
import {NumberInputControl} from "formik-chakra-ui";
import {gradeValidationSchema} from "components/matchPage/sections/grade/grade.validation";
import {useGrades} from "hooks/useGrades";

interface GradeEditModalProps {
  isOpen: boolean;
  handleClose: () => void;
  match: Match;
}

interface GradeFormikValues {
  refereeGrade: number;
}

export const GradeEditModal = ({ isOpen, handleClose, match }: GradeEditModalProps) => {
  const { updateGradeMutation: updateMutation } = useGrades({ matchId: match.id });

  useEffect(() => {
    if (updateMutation.isSuccess) {
      handleClose();
      updateMutation.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateMutation.isSuccess]);

  const initialValues: GradeFormikValues = {
    refereeGrade: match.refereeGrade ?? 0,
  };

  const handleEditGrade = (values: GradeFormikValues) => {
    updateMutation.mutate({
      ...match,
      refereeGrade: values.refereeGrade,
    } as Match);
  };

  const modalBody: JSX.Element = (
    <>
      <NumberInputControl name='refereeGrade' label='Referee grade' />
    </>
  );

  return (
    <FormikModal
      headingTitle={'Edit match grade'}
      body={modalBody}
      isOpen={isOpen}
      handleSubmit={handleEditGrade}
      isLoading={updateMutation.isLoading}
      handleClose={handleClose}
      initialValues={initialValues}
      validationSchema={gradeValidationSchema}
    />
  );
}