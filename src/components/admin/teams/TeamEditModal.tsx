import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { InputControl } from 'formik-chakra-ui';
import { useEffect } from 'react';
import { Team, teamValidationSchema } from 'entities/Team';
import { useLeagueTeams } from 'hooks/useLeagueTeams';
import { useTranslation } from 'react-i18next';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    team: Team;
}

interface FormikValues {
    name: string;
}

export const TeamEditModal = (props: Props) => {
    const { updateMutation } = useLeagueTeams();
    const { t } = useTranslation();

    useEffect(() => {
        if (updateMutation.isSuccess) {
            props.onClose();
            updateMutation.reset();
        }
    }, [updateMutation.isSuccess]);

    const initialValues: FormikValues = {
        name: props.team.name,
    };

    const editTeam = (values: FormikValues) => {
        updateMutation.mutate({ id: props.team.id, name: values.name });
    };

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{t('teams.edit')}</ModalHeader>
                <ModalCloseButton />

                <Formik initialValues={initialValues} onSubmit={editTeam} validationSchema={teamValidationSchema}>
                    {({ handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <ModalBody>
                                <InputControl name="name" label={t('teams.name')} />
                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme="blue" mr={'3'} type="submit" isLoading={updateMutation.isLoading}>
                                    {t('modal.save')}
                                </Button>
                                <Button onClick={props.onClose}>{t('modal.cancel')}</Button>
                            </ModalFooter>
                        </Form>
                    )}
                </Formik>
            </ModalContent>
        </Modal>
    );
};
