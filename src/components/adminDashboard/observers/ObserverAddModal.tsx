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
import {Role} from "../../../shared/Role";
import {User, userValidationSchema} from "../../../entities/User";
import {useLeagueUsers} from "../../../hooks/useLeagueUsers";

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

export const ObserverAddModal = (props: Props) => {
  const { addMutation } = useLeagueUsers(Role.Observer);

  useEffect(() => {
    if (addMutation.isSuccess) {
      props.onClose();
      addMutation.reset();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addMutation.isSuccess]);

  const initialValues: FormikValues = {
    email: '',
    phoneNumber: '',
    firstName: '',
    lastName: ''
  };

  const assignObserver = (values: FormikValues) => {
    addMutation.mutate({
      email: values.email,
      phoneNumber: values.phoneNumber,
      role: Role.Observer,
      firstName: values.firstName,
      lastName: values.lastName
    } as User);
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add observer</ModalHeader>
        <ModalCloseButton />

        <Formik initialValues={initialValues} onSubmit={assignObserver} validationSchema={userValidationSchema}>
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <ModalBody>
                <InputControl name='email' label='Email address' inputProps={{ placeholder: 'john.doe@gmail.com' }} />
                <InputControl name='phoneNumber' label='Phone number' inputProps={{ placeholder: '+48 669 797 907' }} />
                <InputControl name='firstName' label='First name' inputProps={{ placeholder: 'John' }} />
                <InputControl name='lastName' label='Last name' inputProps={{ placeholder: 'Doe' }} />
              </ModalBody>
              <ModalFooter>
                <Button mr={'3'} type='submit' isLoading={addMutation.isLoading}>
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
