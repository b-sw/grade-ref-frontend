import Yup from 'utils/yup';

export const gradeValidationSchema = Yup.object({
  refereeGrade: Yup.string().matches(/^(\d{1,2}(\.\d)?)(\/(\d{1,2}(\.\d)?))?$/),
});
