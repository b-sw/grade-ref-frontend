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
import {Team, teamValidationSchema} from "../../../entities/Team";
import {useLeagueTeams} from "../../../hooks/useLeagueTeams";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  team: Team;
}

interface FormikValues {
  name: string;
}

export const TeamEditModal = (props: Props) => {
  const { updateMutation } = useLeagueTeams();

  useEffect(() => {
    if (updateMutation.isSuccess) {
      props.onClose();
      updateMutation.reset();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateMutation.isSuccess]);

  const initialValues: FormikValues = {
    name: props.team.name,
  };

  const editTeam = (values: FormikValues) => {
    updateMutation.mutate({ id: props.team.id, name: values.name });
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit team</ModalHeader>
        <ModalCloseButton />

        <Formik initialValues={initialValues} onSubmit={editTeam} validationSchema={teamValidationSchema}>
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <ModalBody>
                <InputControl name='name' label='Nazwa' />
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
