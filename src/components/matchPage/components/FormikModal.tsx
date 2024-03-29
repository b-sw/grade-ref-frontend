import {
    Button,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';

export interface FormikModalProps<T> {
    headingTitle: string;
    body: JSX.Element;
    isOpen: boolean;
    isLoading: boolean;
    handleSubmit: (values: T) => void;
    handleClose: () => void;
    initialValues: T;
    validationSchema: any;
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}

export const FormikModal = <T,>({
    headingTitle,
    body,
    isOpen,
    isLoading,
    handleSubmit,
    handleClose,
    initialValues,
    validationSchema,
    size,
}: FormikModalProps<T>) => {
    const { t } = useTranslation();
    return (
        <Modal isOpen={isOpen} onClose={handleClose} isCentered size={size ?? 'md'}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{headingTitle}</ModalHeader>
                <ModalCloseButton />

                <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                    {({ handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <ModalBody>
                                <Flex direction={'column'} gap={3}>
                                    {body}
                                </Flex>
                            </ModalBody>

                            <ModalFooter>
                                <Button type="submit" colorScheme="blue" mr={'3'} isLoading={isLoading}>
                                    {t('modal.save')}
                                </Button>
                                <Button onClick={handleClose}>{t('modal.cancel')}</Button>
                            </ModalFooter>
                        </Form>
                    )}
                </Formik>
            </ModalContent>
        </Modal>
    );
};
