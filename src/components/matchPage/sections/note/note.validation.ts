import Yup from "utils/yup";

export const noteValidationSchema = Yup.object({
  refereeNote: Yup.string().required().min(5).max(1000),
});