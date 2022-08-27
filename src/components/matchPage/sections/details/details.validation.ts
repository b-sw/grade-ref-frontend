import Yup from 'utils/yup';

export const detailsValidationSchema = Yup.object({
    date: Yup.string().required(),
    stadium: Yup.string().required().min(5).max(50),
    homeTeamId: Yup.string().required(),
    awayTeamId: Yup.string().required(),
});
