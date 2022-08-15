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
import { useLeagues } from 'hooks/useLeagues';
import { League, leagueValidationSchema } from 'entities/League';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  useEffect(() => {
    if (postMutation.isSuccess) {
      props.onClose();
      postMutation.reset();
    }
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
        <ModalHeader>{t('explorer.addModal.title')}</ModalHeader>
        <ModalCloseButton />

        <Formik initialValues={initialValues} onSubmit={createLeague} validationSchema={leagueValidationSchema}>
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <ModalBody>
                <InputControl
                  name="name"
                  label={t('explorer.addModal.name')}
                  inputProps={{ placeholder: 'Premier League' }}
                />
                <InputControl
                  name="shortName"
                  label={t('explorer.addModal.shortName')}
                  inputProps={{ placeholder: 'EPL' }}
                  mt={3}
                />
                <InputControl
                  name="country"
                  label={t('explorer.addModal.country')}
                  inputProps={{ placeholder: 'England' }}
                  mt={3}
                />
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={'3'} type="submit" isLoading={postMutation.isLoading}>
                  {t('modal.add')}
                </Button>
                <Button onClick={() => props.onClose()}>{t('modal.cancel')}</Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};
