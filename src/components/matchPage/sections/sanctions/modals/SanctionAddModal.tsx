import { useLeagueMatch } from 'hooks/useLeagueMatch';
import { SanctionModal } from 'components/matchPage/sections/sanctions/modals/SanctionModal';
import { useMatchFouls } from 'components/matchPage/sections/sanctions/useMatchFouls';

interface SanctionAddModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

export const SanctionAddModal = ({ isOpen, handleClose }: SanctionAddModalProps) => {
  const { postMutation } = useMatchFouls();
  const { query: matchQuery } = useLeagueMatch();

  return <SanctionModal isOpen={isOpen} handleClose={handleClose} match={matchQuery.data!} mutation={postMutation} />;
};
