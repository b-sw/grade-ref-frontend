import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { InputControl } from 'formik-chakra-ui';
import { useEffect } from 'react';
import {User, userValidationSchema} from "../../../entities/User";
import {useUsers} from "../../../hooks/useUsers";
import {Role} from "../../../shared/Role";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  referee: User;
}

interface FormikValues {
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
}

export const RefereeEditModal = (props: Props) => {
  const { updateMutation } = useUsers();

  useEffect(() => {
    if (updateMutation.isSuccess) {
      props.onClose();
      updateMutation.reset();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateMutation.isSuccess]);

  const initialValues: FormikValues = {
    email: props.referee.email,
    phoneNumber: props.referee.phoneNumber,
    firstName: props.referee.firstName,
    lastName: props.referee.lastName,
  };

  const editReferee = (values: FormikValues) => {
    updateMutation.mutate({
      id: props.referee.id,
      email: values.email,
      phoneNumber: values.phoneNumber,
      role: Role.Referee,
      firstName: values.firstName,
      lastName: values.lastName
    } as User);
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit referee</ModalHeader>
        <ModalCloseButton />

        <Formik initialValues={initialValues} onSubmit={editReferee} validationSchema={userValidationSchema}>
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <ModalBody>
                <InputControl name='email' label='Email address' />
                <InputControl name='phoneNumber' label='Phone number' />
                <InputControl name='firstName' label='First name' />
                <InputControl name='lastName' label='Last name' />
              </ModalBody>
              <ModalFooter>
                <Button colorScheme='blue' mr={'3'} type='submit' isLoading={updateMutation.isLoading}>
                  Save
                </Button>
                <Button onClick={props.onClose}>Cancel</Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};
