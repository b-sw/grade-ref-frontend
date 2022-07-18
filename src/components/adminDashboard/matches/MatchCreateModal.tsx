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
import {uuid} from "utils/uuid";
import {useLeagueMatches} from "hooks/useLeagueMatches";
import {useLeagueTeams} from "hooks/useLeagueTeams";
import {Match, matchValidationSchema} from "entities/Match";
import {Constants, FORMIK_DATETIME_FORMAT} from "utils/Constants";
import dayjs, { Dayjs } from 'dayjs';
import {useLeagueUsers} from "hooks/useLeagueUsers";
import {Role} from "utils/Role";
import { useStore } from "zustandStore/store";
import {SelectOptions} from "components/shared/match/components/SelectOptions";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface FormikValues {
  date: string;
  homeTeamId: uuid;
  awayTeamId: uuid;
  refereeId: uuid;
  observerId: uuid;
}

export const MatchCreateModal = (props: Props) => {
  const selectedDate: Dayjs = useStore((state) => state.selectedDate);
  const { postMutation } = useLeagueMatches();
  const { query: teamsQuery } = useLeagueTeams();
  const { usersQuery: refereesQuery } = useLeagueUsers(Role.Referee);
  const { usersQuery: observersQuery } = useLeagueUsers(Role.Observer);

  useEffect(() => {
    if (postMutation.isSuccess) {
      props.onClose();
      postMutation.reset();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postMutation.isSuccess]);

  const initialValues: FormikValues = {
    date: dayjs(selectedDate).format(FORMIK_DATETIME_FORMAT),
    homeTeamId: '',
    awayTeamId: '',
    refereeId: '',
    observerId: '',
  };

  const createMatch = (values: FormikValues) => {
    const matchDate: Date = dayjs(values.date, Constants.DATETIME_FORMAT).toDate();
    postMutation.mutate({
      matchDate: matchDate,
      stadium: 'some stadium',
      homeTeamId: values.homeTeamId,
      awayTeamId: values.awayTeamId,
      refereeId: values.refereeId,
      observerId: values.observerId,
    } as Match);
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add match</ModalHeader>
        <ModalCloseButton />

        <Formik initialValues={initialValues} onSubmit={createMatch} validationSchema={matchValidationSchema}>
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <ModalBody>
                <InputControl name='date' label='Date' inputProps={{ type: 'datetime-local' }} />

                <SelectControl
                  name='homeTeamId'
                  label='Home team'
                  selectProps={{ placeholder: 'Choose home team' }}
                  mt={3}
                >
                  <SelectOptions data={teamsQuery.data} labelProps={['name']} />
                </SelectControl>

                <SelectControl
                  name='awayTeamId'
                  label='Away team'
                  selectProps={{ placeholder: 'Choose away team' }}
                  mt={3}
                >
                  <SelectOptions data={teamsQuery.data} labelProps={['name']} />
                </SelectControl>

                <SelectControl
                  name='refereeId'
                  label='Referee'
                  selectProps={{ placeholder: 'Assign referee' }}
                  mt={3}
                >
                  <SelectOptions data={refereesQuery.data} labelProps={['firstName', 'lastName']} />
                </SelectControl>

                <SelectControl
                  name='observerId'
                  label='Observer'
                  selectProps={{ placeholder: 'Assign observer' }}
                  mt={3}
                >
                  <SelectOptions data={observersQuery.data} labelProps={['firstName', 'lastName']} />
                </SelectControl>
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
