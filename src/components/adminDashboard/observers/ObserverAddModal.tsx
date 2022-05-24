import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import {Role} from "../../../shared/Role";
import { MultiValue, Select } from 'chakra-react-select';
import { User } from '../../../entities/User';
import {useSetState} from "../../../hooks/useSetState";
import {useLeagueUsers} from "../../../hooks/useLeagueUsers";

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
  mappedObservers: Option[],
}


export const ObserverAddModal = (props: Props) => {
  const {
    usersQuery: observersQuery,
    leagueUsersQuery: leagueObserversQuery,
    addMutation
  } = useLeagueUsers(Role.Observer);

  const [state, setState] = useSetState({
    selectedOptions: [],
    mappedObservers: [],
  } as State);

  const updateSelection = (selection: MultiValue<Option>) => {
    setState({ selectedOptions: selection });
  }

  useEffect(() => {
    const filteredReferees: User[] = observersQuery.data!.filter((observer: User) =>
      !leagueObserversQuery.data!.some((leagueObserver) => leagueObserver.id === observer.id)
    );
    const observers: Option[] = filteredReferees.map((observer) => ({
      value: observer,
      label: observer.firstName + ' ' + observer.lastName,
    }));
    setState({ mappedObservers: observers });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leagueObserversQuery.data]);

  useEffect(() => {
    if (addMutation.isSuccess) {
      props.onClose();
      addMutation.reset();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addMutation.isSuccess]);

  const addObservers = () => {
    const selectedObservers: User[] = state.selectedOptions.map((option: Option) => option.value as User);
    selectedObservers.forEach((referee) => addMutation.mutate(referee));
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add observer</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <FormControl p={4}>
            <FormLabel>
              Select observer
            </FormLabel>
            <Select
              isMulti
              name={'referees'}
              options={state.mappedObservers}
              placeholder={'Select observer'}
              closeMenuOnSelect={false}
              onChange={(selection) => updateSelection(selection)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={'3'} onClick={addObservers} isLoading={addMutation.isLoading}>
            Add
          </Button>
          <Button onClick={() => props.onClose()}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
