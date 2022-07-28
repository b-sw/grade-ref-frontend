import Yup from '../utils/yup';
import { uuid } from 'utils/uuid';

export type Team = {
  id: uuid;
  name: string;
};

export const teamValidationSchema = Yup.object({
  name: Yup.string().required().max(30),
});
