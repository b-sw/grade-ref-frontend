import {GRADE_ADMISSION_TIME_WINDOW, Match} from "entities/Match";
import {FormikModal} from "components/shared/match/components/FormikModal";
import {useEffect} from "react";
import {InputControl, NumberInputControl} from "formik-chakra-ui";
import {GradeStatus} from "components/shared/match/gradeInfo";
import {gradeValidationSchema} from "components/shared/match/sections/grade/grade.validation";
import {useGrades} from "hooks/useGrades";
import {useStore} from "zustandStore/store";
import {Role} from "utils/Role";
import dayjs from "dayjs";

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
  const user = useStore(state => state.user);
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

  const userIsAdmin: boolean = user.role === Role.Admin;
  const gradeIsPastDue: boolean = dayjs(match.matchDate).add(GRADE_ADMISSION_TIME_WINDOW, 'hour').isBefore(dayjs());
  const gradeIsReceived: boolean = match.gradeStatus.status === GradeStatus.Received;

  const isGradeDisabled: boolean = !userIsAdmin && gradeIsReceived && gradeIsPastDue;

  const modalBody: JSX.Element = (
    <>
      <NumberInputControl name='refereeGrade' label='Referee grade' isDisabled={isGradeDisabled} />
      <InputControl name='overallGrade' label='OverallGrade' />
    </>
  );

  return (
    <FormikModal
      headingTitle={'Edit match grade'}
      body={modalBody}
      isOpen={isOpen}
      handleSubmit={handleEditMatch}
      isLoading={updateMutation.isLoading}
      handleClose={handleClose}
      initialValues={initialValues}
      validationSchema={gradeValidationSchema}
    />
  );
}