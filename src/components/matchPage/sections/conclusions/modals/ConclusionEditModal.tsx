import { useMatchFeatures } from 'components/matchPage/sections/conclusions/useMatchFeatures';
import { ConclusionModal } from 'components/matchPage/sections/conclusions/modals/ConclusionModal';
import { Feature } from 'entities/Feature';
import { useMatch } from 'hooks/useMatch';

interface ConclusionEditModalProps {
  isOpen: boolean;
  handleClose: () => void;
  initialValue: Feature;
}

export const ConclusionEditModal = ({ isOpen, handleClose, initialValue }: ConclusionEditModalProps) => {
  const { updateMutation } = useMatchFeatures();
  const { query: matchQuery } = useMatch();

  return (
    <ConclusionModal
      isOpen={isOpen}
      handleClose={handleClose}
      match={matchQuery.data!}
      mutation={updateMutation}
      feature={initialValue}
    />
  );
};
