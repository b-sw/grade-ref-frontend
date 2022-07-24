import {Match} from "entities/Match";
import {FormikModal} from "components/matchPage/components/FormikModal";
import {useEffect} from "react";
import { TextareaControl } from "formik-chakra-ui";
import { useGrades } from "hooks/useGrades";
import { overallGradeValidationSchema } from 'components/matchPage/sections/overallGrade/overall-grade.validation';

interface OverallGradeEditModalProps {
  isOpen: boolean;
  handleClose: () => void;
  match: Match;
}

interface GradeFormikValues {
  overallGrade: string;
}

export const OverallGradeEditModal = ({ isOpen, handleClose, match }: OverallGradeEditModalProps) => {
  const { updateOverallGradeMutation: updateMutation } = useGrades();

  useEffect(() => {
    if (updateMutation.isSuccess) {
      handleClose();
      updateMutation.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateMutation.isSuccess]);

  const initialValues: GradeFormikValues = {
    overallGrade: match.overallGrade ?? '',
  };

  const handleEditGrade = (values: GradeFormikValues) => {
    updateMutation.mutate({
      overallGrade: values.overallGrade,
    } as Match);
  };

  const modalBody: JSX.Element = (
    <>
      <TextareaControl
        name='overallGrade'
        label='Overall grade'
        textareaProps={{
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
      headingTitle={'Edit match overall grade'}
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
}