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
import {Select} from "chakra-react-select";
import {useLeagueUsers} from "../../../hooks/useLeagueUsers";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

// interface FormikValues {
//   email: string;
//   phoneNumber: string;
//   firstName: string;
//   lastName: string;
// }

export const RefereeAddModal = (props: Props) => {
  const { usersQuery: refereesQuery, addMutation } = useLeagueUsers(Role.Referee);
  const mappedReferees = refereesQuery.data!.map((referee) => ({
    value: referee,
    label: referee.firstName + ' ' + referee.lastName,
  }));

  useEffect(() => {
    if (addMutation.isSuccess) {
      props.onClose();
      addMutation.reset();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addMutation.isSuccess]);

  // const addReferee = (values: FormikValues) => {
  //   addMutation.mutate({
  //     email: values.email,
  //     phoneNumber: values.phoneNumber,
  //     role: Role.Referee,
  //     firstName: values.firstName,
  //     lastName: values.lastName
  //   } as User);
  // };

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
              options={mappedReferees}
              placeholder={'Select referee'}
              closeMenuOnSelect={false}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button mr={'3'} type='submit' isLoading={addMutation.isLoading}>
            Add
          </Button>
          <Button onClick={() => props.onClose()}>Cancel</Button>
        </ModalFooter>

      </ModalContent>
    </Modal>
  );
};
