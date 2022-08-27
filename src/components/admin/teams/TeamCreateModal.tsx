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
import { useLeagueTeams } from 'hooks/useLeagueTeams';
import { Team, teamValidationSchema } from 'entities/Team';
import { useTranslation } from 'react-i18next';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

interface FormikValues {
    name: string;
}

export const TeamCreateModal = (props: Props) => {
    const { postMutation } = useLeagueTeams();
    const { t } = useTranslation();

    useEffect(() => {
        if (postMutation.isSuccess) {
            props.onClose();
            postMutation.reset();
        }
    }, [postMutation.isSuccess]);

    const initialValues: FormikValues = {
        name: '',
    };

    const createTeam = (values: FormikValues) => {
        postMutation.mutate({ name: values.name } as Team);
    };

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{t('teams.addModal.title')}</ModalHeader>
                <ModalCloseButton />

                <Formik initialValues={initialValues} onSubmit={createTeam} validationSchema={teamValidationSchema}>
                    {({ handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <ModalBody>
                                <InputControl
                                    name="name"
                                    label={t('teams.name')}
                                    inputProps={{ placeholder: 'Legia Warszawa' }}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme="blue" mr={'3'} type="submit" isLoading={postMutation.isLoading}>
                                    {t('modal.add')}
                                </Button>
                                <Button onClick={() => props.onClose()}>{t('modal.cancel')}</Button>
                            </ModalFooter>
                        </Form>
                    )}
                </Formik>
            </ModalContent>
        </Modal>
    );
};
