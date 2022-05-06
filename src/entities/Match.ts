import {uuid} from "../other/uuid";
import Yup from "../other/yup";

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
  // homeTeam: Yup.string().required(),
});