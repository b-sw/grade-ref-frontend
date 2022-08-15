import { uuid } from 'utils/uuid';

export enum Card {
  Yellow = 'Yellow',
  Red = 'Red',
}

export type Foul = {
  id: uuid;
  minute: number;
  card: Card;
  playerNumber: number;
  description: string;
  valid: boolean;
  teamId: uuid;
  matchId: uuid;
};
