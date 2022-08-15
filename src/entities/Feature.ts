import { uuid } from 'utils/uuid';

export enum FeatureType {
  Positive = 'Positive',
  Negative = 'Negative',
}

export type Feature = {
  id: uuid;
  type: FeatureType;
  description: string;
  refereeId: uuid;
  matchId: uuid;
};
