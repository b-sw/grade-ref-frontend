import { FormikModal } from 'components/matchPage/components/FormikModal';
import { useEffect } from 'react';
import { InputControl, SelectControl } from 'formik-chakra-ui';
import { SelectOptionsConstant } from 'components/matchPage/components/SelectOptions';
import { Feature, FeatureType } from 'entities/Feature';
import { conclusionsValidationSchema } from 'components/matchPage/sections/conclusions/conclusions.validation';
import { AxiosError } from 'axios';
import { UseMutationResult } from 'react-query';
import { MatchInfoEnriched } from 'entities/MatchInfoEnriched';
import { useTranslation } from 'react-i18next';

interface ConclusionModalProps {
    isOpen: boolean;
    handleClose: () => void;
    match: MatchInfoEnriched;
    mutation: UseMutationResult<Feature, AxiosError<unknown, any>, Feature, unknown>;
    feature?: Feature;
}

interface ConclusionFormikValues {
    type: FeatureType;
    description: string;
}

export const ConclusionModal = ({ isOpen, handleClose, match, mutation, feature }: ConclusionModalProps) => {
    const { t } = useTranslation();

    const conclusionsTypeOptions = {
        [FeatureType.Positive]: t('conclusions.positive'),
        [FeatureType.Negative]: t('conclusions.negative'),
    };

    useEffect(() => {
        if (mutation.isSuccess) {
            handleClose();
            mutation.reset();
        }
    }, [mutation.isSuccess]);

    const initialValues: ConclusionFormikValues = {
        type: feature ? feature.type : FeatureType.Positive,
        description: feature ? feature.description : '',
    };

    const handleMutateFeature = (values: ConclusionFormikValues) => {
        mutation.mutate({
            ...values,
            matchId: match.id,
            id: feature?.id,
        } as Feature);
    };

    const modalBody: JSX.Element = (
        <>
            <SelectControl name="type" label={t('conclusions.type')}>
                <SelectOptionsConstant
                    valuesMap={{
                        [conclusionsTypeOptions[FeatureType.Positive]]: FeatureType.Positive,
                        [conclusionsTypeOptions[FeatureType.Negative]]: FeatureType.Negative,
                    }}
                />
            </SelectControl>

            <InputControl name="description" label={t('conclusions.description')} />
        </>
    );

    return (
        <FormikModal
            headingTitle={feature ? t('modal.edit') : t('modal.add') + ' ' + t('matchPage.conclusions.modal.title')}
            body={modalBody}
            isOpen={isOpen}
            handleSubmit={handleMutateFeature}
            isLoading={mutation.isLoading}
            handleClose={handleClose}
            initialValues={initialValues}
            validationSchema={conclusionsValidationSchema}
        />
    );
};
