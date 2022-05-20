import Yup from '../shared/yup';
import {uuid} from "../shared/uuid";

export type Team = {
  id: uuid;
  name: string;
}

export const teamValidationSchema = Yup.object({
  name: Yup.string().required().max(30),
});