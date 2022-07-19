import { Match } from "entities/Match";
import { FormikModal } from "components/shared/match/components/FormikModal";
import { useEffect } from "react";
import { InputControl, SelectControl } from "formik-chakra-ui";
import { SelectOptionsConstant } from 'components/shared/match/components/SelectOptions';
import { Feature, FeatureType } from 'entities/Feature';
import { useFeatures } from 'components/shared/match/sections/conclusions/hooks/useFeatures';
import { conclusionsValidationSchema } from 'components/shared/match/sections/conclusions/conclusions.validation';

interface ConclusionAddModalProps {
  isOpen: boolean;
  handleClose: () => void;
  match: Match;
}

interface ConclusionFormikValues {
  type: FeatureType;
  description: string;
}

export const ConclusionAddModal = ({ isOpen, handleClose, match }: ConclusionAddModalProps) => {
  const { postMutation } = useFeatures({ matchId: match.id });

  useEffect(() => {
    if (postMutation.isSuccess) {
      handleClose();
      postMutation.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialValues: ConclusionFormikValues = {
    type: FeatureType.Positive,
    description: '',
  }

  const handleCreateFeature = (values: ConclusionFormikValues) => {
    postMutation.mutate({
      ...values,
      refereeId: match.refereeId,
      matchId: match.id,
    } as Feature);
  };

  const modalBody: JSX.Element = (
    <>
      <SelectControl name='type' label='Type'>
        <SelectOptionsConstant valuesMap={{ [FeatureType.Positive]: FeatureType.Positive, [FeatureType.Negative]: FeatureType.Negative }} />
      </SelectControl>

      <InputControl name='description' label='Description' />
    </>
  );

  return (
    <FormikModal
      headingTitle={'Add conclusion'}
      body={modalBody}
      isOpen={isOpen}
      handleSubmit={handleCreateFeature}
      isLoading={postMutation.isLoading}
      handleClose={handleClose}
      initialValues={initialValues}
      validationSchema={conclusionsValidationSchema}
    />
  );
};
