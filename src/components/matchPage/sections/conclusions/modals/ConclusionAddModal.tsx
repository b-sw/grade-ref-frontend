import { useMatchFeatures } from 'components/matchPage/sections/conclusions/useMatchFeatures';
import { ConclusionModal } from 'components/matchPage/sections/conclusions/modals/ConclusionModal';
import { useLeagueMatch } from 'hooks/useLeagueMatch';

interface ConclusionAddModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

export const ConclusionAddModal = ({ isOpen, handleClose }: ConclusionAddModalProps) => {
  const { postMutation } = useMatchFeatures();
  const { query: matchQuery } = useLeagueMatch();

  return (
    <ConclusionModal isOpen={isOpen} handleClose={handleClose} match={matchQuery.data!} mutation={postMutation} />
  );
};
