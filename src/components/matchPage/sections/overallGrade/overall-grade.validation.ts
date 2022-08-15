import Yup from 'utils/yup';

export const overallGradeValidationSchema = Yup.object({
  overallGrade: Yup.string().required().min(1).max(3000),
});
