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
import {useLeagueTeams} from "hooks/useLeagueTeams";
import {Team, teamValidationSchema} from "entities/Team";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface FormikValues {
  name: string;
}

export const TeamCreateModal = (props: Props) => {
  const { postMutation } = useLeagueTeams();

  useEffect(() => {
    if (postMutation.isSuccess) {
      props.onClose();
      postMutation.reset();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postMutation.isSuccess]);

  const initialValues: FormikValues = {
    name: '',
  };

  const editTeam = (values: FormikValues) => {
    postMutation.mutate({ name: values.name } as Team);
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add team</ModalHeader>
        <ModalCloseButton />

        <Formik initialValues={initialValues} onSubmit={editTeam} validationSchema={teamValidationSchema}>
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <ModalBody>
                <InputControl name='name' label='Name' inputProps={{ placeholder: 'Legia Warszawa' }} />
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
