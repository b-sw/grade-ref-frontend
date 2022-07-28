import { useMatchFeatures } from 'components/matchPage/sections/conclusions/useMatchFeatures';
import { ConclusionModal } from 'components/matchPage/sections/conclusions/modals/ConclusionModal';
import { useMatch } from 'hooks/useMatch';

interface ConclusionAddModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

export const ConclusionAddModal = ({ isOpen, handleClose }: ConclusionAddModalProps) => {
  const { postMutation } = useMatchFeatures();
  const { query: matchQuery } = useMatch();

  return <ConclusionModal isOpen={isOpen} handleClose={handleClose} match={matchQuery.data!} mutation={postMutation} />;
};
