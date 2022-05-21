import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import {useEffect} from 'react';
import {Role} from "../../../shared/Role";
import {MultiValue, Select} from "chakra-react-select";
import {useLeagueUsers} from "../../../hooks/useLeagueUsers";
import {useSetState} from "../../../hooks/useSetState";
import {User} from "../../../entities/User";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface Option {
  value: User,
  label: string,
}

interface State {
  selectedOptions: MultiValue<Option>,
  mappedReferees: Option[],
}

export const RefereeAddModal = (props: Props) => {
  const {
    usersQuery: refereesQuery,
    leagueUsersQuery: leagueRefereesQuery,
    addMutation
  } = useLeagueUsers(Role.Referee);

  const [state, setState] = useSetState({
    selectedOptions: [],
    mappedReferees: [],
  } as State);

  const updateSelection = (selection: MultiValue<Option>) => {
    setState({ selectedOptions: selection });
  }

  useEffect(() => {
    const filteredReferees: User[] = refereesQuery.data!.filter((referee: User) =>
      !leagueRefereesQuery.data!.some((leagueReferee) => leagueReferee.id === referee.id)
    );
    const referees: Option[] = filteredReferees.map((referee) => ({
      value: referee,
      label: referee.firstName + ' ' + referee.lastName,
    }));
    setState({ mappedReferees: referees });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leagueRefereesQuery.data]);

  useEffect(() => {
    if (addMutation.isSuccess) {
      props.onClose();
      addMutation.reset();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addMutation.isSuccess]);

  const addReferees = () => {
    const selectedReferees: User[] = state.selectedOptions.map((option: Option) => option.value as User);
    selectedReferees.forEach((referee) => addMutation.mutate(referee));
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add referee to league</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <FormControl p={4}>
            <FormLabel>
              Select referee
            </FormLabel>
            <Select
              isMulti
              name={'referees'}
              options={state.mappedReferees}
              placeholder={'Select referee'}
              closeMenuOnSelect={false}
              onChange={(selection) => updateSelection(selection)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button mr={'3'} onClick={addReferees} isLoading={addMutation.isLoading}>
            Add
          </Button>
          <Button onClick={() => props.onClose()}>Cancel</Button>
        </ModalFooter>

      </ModalContent>
    </Modal>
  );
};
