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
import {useUsers} from "../../../hooks/useUsers";
import {Role} from "../../../other/Role";
import {User, userValidationSchema} from "../../../entities/User";

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

export const RefereeCreateModal = (props: Props) => {
  const { postMutation } = useUsers();

  useEffect(() => {
    if (postMutation.isSuccess) {
      props.onClose();
      postMutation.reset();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postMutation.isSuccess]);

  const initialValues: FormikValues = {
    email: '',
    phoneNumber: '',
    firstName: '',
    lastName: ''
  };

  const createReferee = (values: FormikValues) => {
    postMutation.mutate({
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
        <ModalHeader>Add referee</ModalHeader>
        <ModalCloseButton />

        <Formik initialValues={initialValues} onSubmit={createReferee} validationSchema={userValidationSchema}>
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <ModalBody>
                <InputControl name='email' label='Email address' inputProps={{ placeholder: 'john.doe@gmail.com' }} />
                <InputControl name='phoneNumber' label='Phone number' inputProps={{ placeholder: '+48 669 797 907' }} />
                <InputControl name='firstName' label='First name' inputProps={{ placeholder: 'John' }} />
                <InputControl name='lastName' label='Last name' inputProps={{ placeholder: 'Doe' }} />
              </ModalBody>
              <ModalFooter>
                <Button mr={'3'} type='submit' isLoading={postMutation.isLoading}>
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
