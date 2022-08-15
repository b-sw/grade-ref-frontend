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
import { useUsers } from 'hooks/useUsers';
import { Role } from 'utils/Role';
import { User, userValidationSchema } from 'entities/User';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface FormikValues {
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
}

export const ObserverCreateModal = (props: Props) => {
  const { postMutation } = useUsers();

  useEffect(() => {
    if (postMutation.isSuccess) {
      props.onClose();
      postMutation.reset();
    }
  }, [postMutation.isSuccess]);

  const initialValues: FormikValues = {
    email: '',
    phoneNumber: '',
    firstName: '',
    lastName: '',
  };

  const createObserver = (values: FormikValues) => {
    postMutation.mutate({
      email: values.email,
      phoneNumber: values.phoneNumber,
      role: Role.Observer,
      firstName: values.firstName,
      lastName: values.lastName,
    } as User);
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add observer</ModalHeader>
        <ModalCloseButton />

        <Formik initialValues={initialValues} onSubmit={createObserver} validationSchema={userValidationSchema}>
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <ModalBody>
                <InputControl name="email" label="Email address" inputProps={{ placeholder: 'john.doe@gmail.com' }} />
                <InputControl name="phoneNumber" label="Phone number" inputProps={{ placeholder: '+48 669 797 907' }} />
                <InputControl name="firstName" label="First name" inputProps={{ placeholder: 'John' }} />
                <InputControl name="lastName" label="Last name" inputProps={{ placeholder: 'Doe' }} />
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={'3'} type="submit" isLoading={postMutation.isLoading}>
                  Add
                </Button>
                <Button onClick={() => props.onClose()}>Cancel</Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};
