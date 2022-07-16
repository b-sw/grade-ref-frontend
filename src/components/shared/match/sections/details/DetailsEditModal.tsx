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
import { InputControl, SelectControl } from 'formik-chakra-ui';
import { useEffect } from 'react';
import {Match} from "entities/Match";
import {uuid} from "utils/uuid";
import {useLeagueMatches} from "hooks/useLeagueMatches";
import {useLeagueTeams} from "hooks/useLeagueTeams";
import {Constants, FORMIK_DATETIME_FORMAT} from "utils/Constants";
import dayjs from 'dayjs';
import {Team} from "entities/Team";
import {detailsValidationSchema} from "components/shared/match/sections/details/Details.validation";
import {LoadingOverlay} from "pages/LoadingOverlay";

interface DetailsEditModalProps {
  isOpen: boolean;
  handleClose: () => void;
  match: Match;
}

interface FormikValues {
  date: string;
  stadium: string;
  homeTeamId: uuid;
  awayTeamId: uuid;
}

export const DetailsEditModal = ({ isOpen, handleClose, match }: DetailsEditModalProps) => {
  const { updateMutation } = useLeagueMatches();
  const { query: teamsQuery } = useLeagueTeams();

  useEffect(() => {
    if (updateMutation.isSuccess) {
      handleClose();
      updateMutation.reset();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateMutation.isSuccess]);

  const initialValues: FormikValues = {
    date: dayjs(match.matchDate).format(FORMIK_DATETIME_FORMAT),
    stadium: match.stadium,
    homeTeamId: match.homeTeamId,
    awayTeamId: match.awayTeamId,
  };

  const handleEditMatch = (values: FormikValues) => {
    const newMatchDate: Date = dayjs(values.date, Constants.DATETIME_FORMAT).toDate();

    updateMutation.mutate({
      ...match,
      matchDate: newMatchDate,
      stadium: values.stadium,
      homeTeamId: values.homeTeamId,
      awayTeamId: values.awayTeamId,
    } as Match);
  };

  if (teamsQuery.isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit match details</ModalHeader>
          <ModalCloseButton />

          <Formik initialValues={initialValues} onSubmit={handleEditMatch} validationSchema={detailsValidationSchema}>
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <ModalBody>
                  <InputControl name='date' label='Date' inputProps={{ type: 'datetime-local' }} />

                  <InputControl name='stadium' label='Stadium' />

                  <SelectControl name='homeTeamId' label='Home team' mt={3}>
                    {(teamsQuery.data as Team[]).map((team) => (
                        <option key={team.id} value={team.id}>
                          {team.name}
                        </option>
                      ))}
                  </SelectControl>

                  <SelectControl name='awayTeamId' label='Away team' mt={3}>
                    {(teamsQuery.data as Team[]).map((team) => (
                        <option key={team.id} value={team.id}>
                          {team.name}
                        </option>
                      ))}
                  </SelectControl>
                </ModalBody>

                <ModalFooter>
                  <Button type='submit' colorScheme='blue' mr={'3'} isLoading={updateMutation.isLoading}>
                    Save
                  </Button>
                  <Button onClick={handleClose}>Cancel</Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};
