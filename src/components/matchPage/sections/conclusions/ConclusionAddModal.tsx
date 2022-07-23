import { Match } from "entities/Match";
import { FormikModal } from "components/matchPage/components/FormikModal";
import { useEffect } from "react";
import { InputControl, SelectControl } from "formik-chakra-ui";
import { SelectOptionsConstant } from 'components/matchPage/components/SelectOptions';
import { Feature, FeatureType } from 'entities/Feature';
import { useMatchFeatures } from 'components/matchPage/sections/conclusions/useMatchFeatures';
import { conclusionsValidationSchema } from 'components/matchPage/sections/conclusions/conclusions.validation';

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
  const { postMutation } = useMatchFeatures();

  useEffect(() => {
    if (postMutation.isSuccess) {
      handleClose();
      postMutation.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postMutation.isSuccess]);

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
