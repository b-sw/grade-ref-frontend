import {Match} from "entities/Match";
import {FormikModal} from "components/shared/match/shared/FormikModal";
import {useEffect} from "react";
import {InputControl, NumberInputControl} from "formik-chakra-ui";
import {GradeStatus} from "components/shared/match/gradeInfo";
import {gradeValidationSchema} from "components/shared/match/sections/grade/grade.validation";
import {useGrades} from "hooks/useGrades";

interface GradeEditModalProps {
  isOpen: boolean;
  handleClose: () => void;
  match: Match;
}

interface GradeFormikValues {
  refereeGrade: number;
  overallGrade: string;
}

export const GradeEditModal = ({ isOpen, handleClose, match }: GradeEditModalProps) => {
  const { updateMutation } = useGrades({ matchId: match.id });

  useEffect(() => {
    if (updateMutation.isSuccess) {
      handleClose();
      updateMutation.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateMutation.isSuccess]);

  const initialValues: GradeFormikValues = {
    refereeGrade: match.refereeGrade ?? 0,
    overallGrade: match.overallGrade ?? '',
  };

  const handleEditMatch = (values: GradeFormikValues) => {
    updateMutation.mutate({
      ...match,
      refereeGrade: values.refereeGrade,
      overallGrade: values.overallGrade,
    } as Match);
  };

  const gradeIsPastDueTime: boolean = !!match.gradeStatus.delay;
  const isGradeDisabled: boolean = match.gradeStatus.status === GradeStatus.Received && gradeIsPastDueTime;

  const modalBody: JSX.Element = (
    <>
      <NumberInputControl name='refereeGrade' label='Referee grade' isDisabled={isGradeDisabled}/>
      <InputControl name='overallGrade' label='OverallGrade' />
    </>
  );

  return (
    <FormikModal
      headingTitle={'Edit match grade'}
      body={modalBody}
      isOpen={isOpen}
      handleEdit={handleEditMatch}
      isLoading={updateMutation.isLoading}
      handleClose={handleClose}
      initialValues={initialValues}
      validationSchema={gradeValidationSchema}
    />
  );
}