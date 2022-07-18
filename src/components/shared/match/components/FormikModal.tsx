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
import {Form, Formik} from 'formik';

export interface FormikModalProps<T> {
  headingTitle: string;
  body: JSX.Element;
  isOpen: boolean;
  isLoading: boolean;
  handleEdit: (values: T) => void;
  handleClose: () => void;
  initialValues: T;
  validationSchema: any;
}

export const FormikModal = <T,>(
  {
    headingTitle, body, isOpen, isLoading, handleEdit, handleClose, initialValues, validationSchema }: FormikModalProps<T>
) => {
  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{headingTitle}</ModalHeader>
        <ModalCloseButton />

        <Formik initialValues={initialValues} onSubmit={handleEdit} validationSchema={validationSchema}>
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <ModalBody>
                <Flex direction={'column'} gap={3}>
                  {body}
                </Flex>
              </ModalBody>

              <ModalFooter>
                <Button type='submit' colorScheme='blue' mr={'3'} isLoading={isLoading}>
                  Save
                </Button>
                <Button onClick={handleClose}>Cancel</Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
}