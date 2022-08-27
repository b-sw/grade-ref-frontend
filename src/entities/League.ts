import { uuid } from 'utils/uuid';
import Yup from '../utils/yup';

export type League = {
    id: uuid;
    name: string;
    shortName: string;
    country: string;
};

export const leagueValidationSchema = Yup.object({
    name: Yup.string().required().min(5).max(50),
    shortName: Yup.string().required().min(2).max(5),
    country: Yup.string().required().min(4).max(15),
});
