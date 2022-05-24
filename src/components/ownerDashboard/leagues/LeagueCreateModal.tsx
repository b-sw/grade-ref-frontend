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
import {useLeagues} from "../../../hooks/useLeagues";
import {League, leagueValidationSchema} from "../../../entities/League";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface FormikValues {
  name: string;
  shortName: string;
  country: string;
}

export const LeagueCreateModal = (props: Props) => {
  const { postMutation } = useLeagues();

  useEffect(() => {
    if (postMutation.isSuccess) {
      props.onClose();
      postMutation.reset();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postMutation.isSuccess]);

  const initialValues: FormikValues = {
    name: '',
    shortName: '',
    country: '',
  };

  const createLeague = (values: FormikValues) => {
    postMutation.mutate({
      name: values.name,
      shortName: values.shortName,
      country: values.country,
    } as League);
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add league</ModalHeader>
        <ModalCloseButton />

        <Formik initialValues={initialValues} onSubmit={createLeague} validationSchema={leagueValidationSchema}>
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <ModalBody>
                <InputControl name='name' label='Name' inputProps={{ placeholder: 'Premier League' }} />
                <InputControl name='shortName' label='Short name' inputProps={{ placeholder: 'EPL' }} />
                <InputControl name='country' label='Country' inputProps={{ placeholder: 'England' }} />
              </ModalBody>
              <ModalFooter>
                <Button colorScheme='blue' mr={'3'} type='submit' isLoading={postMutation.isLoading}>
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
