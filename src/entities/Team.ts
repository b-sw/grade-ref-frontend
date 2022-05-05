import Yup from '../other/yup';
import {uuid} from "../other/uuid";

export type Team = {
  id: uuid;
  name: string;
}

export const teamValidationSchema = Yup.object({
  name: Yup.string().required().max(30),
});