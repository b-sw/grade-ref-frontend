import Yup from 'utils/yup';
import { FeatureType } from 'entities/Feature';

export const conclusionsValidationSchema = Yup.object({
    type: Yup.mixed().oneOf([FeatureType.Positive, FeatureType.Negative]),
    description: Yup.string().required().min(5).max(100),
});
