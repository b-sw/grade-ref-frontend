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
import {Form, Formik } from "formik";
import { useEffect } from "react";
import {gradeValidationSchema, Match} from "../../../entities/Match";
import {useGrades} from "../../../hooks/useGrades";
import { NumberInputControl } from 'formik-chakra-ui';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  match: Match;
}

interface FormikValues {
  grade: number;
}

export const GradeEditModal = (props: Props) => {
  const { updateMutation } = useGrades({ matchId: props.match.id })

  useEffect(() => {
    if (updateMutation.isSuccess) {
      props.onClose();
      updateMutation.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateMutation.isSuccess]);

  const initialValues: FormikValues = {
    grade: props.match.refereeGrade ?? 0,
  };

  const editGrade = (values: FormikValues) => {
    updateMutation.mutate({ refereeGrade: values.grade } as Match);
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered size={'xs'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit grade</ModalHeader>
        <ModalCloseButton />

        <Formik initialValues={initialValues} onSubmit={editGrade} validationSchema={gradeValidationSchema}>
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <ModalBody>
                <NumberInputControl name='grade' label='Grade' />
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
}