import Yup from '../shared/yup';
import {uuid} from "../shared/uuid";
import {Role} from "../shared/Role";

export type User = {
  id: uuid;
  email: string;
  role: Role;
  phoneNumber: string;
  firstName: string;
  lastName: string;
}

export const userValidationSchema = Yup.object({
  email: Yup.string().required().max(30),
  phoneNumber: Yup.string().required().max(30),
  firstName: Yup.string().required().max(30),
  lastName: Yup.string().required().max(30),
});