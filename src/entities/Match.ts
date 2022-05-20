import {uuid} from "../shared/uuid";
import Yup from "../shared/yup";

export type Match = {
  id: uuid;
  date: Date;
  stadium: string;
  homeTeamId: uuid;
  awayTeamId: uuid;
  refereeId: uuid;
  observerId: uuid;
}

export const matchValidationSchema = Yup.object({
  date: Yup.string().required(),
  homeTeamId: Yup.string().required(),
  awayTeamId: Yup.string().required(),
  refereeId: Yup.string().required(),
  observerId: Yup.string().required(),
});