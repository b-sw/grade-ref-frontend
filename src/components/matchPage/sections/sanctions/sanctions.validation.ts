import Yup from 'utils/yup';
import { Card } from 'entities/Foul';

export const sanctionsValidationSchema = Yup.object({
  minute: Yup.number().required().min(1).max(100),
  card: Yup.mixed().oneOf([Card.Yellow, Card.Red]),
  playerNumber: Yup.number().required().min(0).max(100),
  description: Yup.string().required().min(5).max(400),
  valid: Yup.bool().required(),
  teamId: Yup.string().required(),
});
