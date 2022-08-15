import { useLeagueMatch } from 'hooks/useLeagueMatch';
import { Foul } from 'entities/Foul';
import { SanctionModal } from 'components/matchPage/sections/sanctions/modals/SanctionModal';
import { useMatchFouls } from 'components/matchPage/sections/sanctions/useMatchFouls';

interface SanctionEditModalProps {
  isOpen: boolean;
  handleClose: () => void;
  initialValue: Foul;
}

export const SanctionEditModal = ({ isOpen, handleClose, initialValue }: SanctionEditModalProps) => {
  const { updateMutation } = useMatchFouls();
  const { query: matchQuery } = useLeagueMatch();

  return (
    <SanctionModal
      isOpen={isOpen}
      handleClose={handleClose}
      match={matchQuery.data!}
      mutation={updateMutation}
      foul={initialValue}
    />
  );
};
