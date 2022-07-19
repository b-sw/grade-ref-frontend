import Yup from "utils/yup";

export const assignmentsValidationSchema = Yup.object({
  refereeId: Yup.string().required(),
  observerId: Yup.string().required(),
});