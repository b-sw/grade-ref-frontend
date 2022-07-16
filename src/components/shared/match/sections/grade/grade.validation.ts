import Yup from "utils/yup";

export const gradeValidationSchema = Yup.object({
  refereeGrade: Yup.number().required().min(1).max(10),
  overallGrade: Yup.string().required().min(1).max(3000),
});