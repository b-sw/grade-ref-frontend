import Yup from '../utils/yup';
import {uuid} from "utils/uuid";
import {Role} from "utils/Role";

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