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
import {League, leagueValidationSchema} from "../../../entities/League";
import {useLeagues} from "../../../hooks/useLeagues";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  league: League;
}

interface FormikValues {
  name: string;
  shortName: string;
  country: string;
}

export const LeagueEditModal = (props: Props) => {
  const { updateMutation } = useLeagues();

  useEffect(() => {
    if (updateMutation.isSuccess) {
      props.onClose();
      updateMutation.reset();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateMutation.isSuccess]);

  const initialValues: FormikValues = {
    name: props.league.name,
    shortName: props.league.shortName,
    country: props.league.country,
  };

  const editLeague = (values: FormikValues) => {
    updateMutation.mutate({
      name: values.name,
      shortName: values.shortName,
      country: values.country,
    } as League);
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit league</ModalHeader>
        <ModalCloseButton />

        <Formik initialValues={initialValues} onSubmit={editLeague} validationSchema={leagueValidationSchema}>
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <ModalBody>
                <InputControl name='email' label='Email address' />
                <InputControl name='phoneNumber' label='Phone number' />
                <InputControl name='firstName' label='First name' />
                <InputControl name='lastName' label='Last name' />
              </ModalBody>
              <ModalFooter>
                <Button mr={'3'} type='submit' isLoading={updateMutation.isLoading}>
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
