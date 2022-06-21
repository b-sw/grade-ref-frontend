import {Button, Flex, Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { MdFileUpload } from 'react-icons/md';
import {useSetState} from "../../../hooks/useSetState";
import {useEffect} from "react";
import {useFile} from "../../../hooks/useFile";
import {MatchesUploadConfirmModal} from "./MatchesUploadConfirmModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface State {
  files: File[];
}

export const MatchesUploadModal = (props: Props) => {
  const { isOpen: isConfirmModalOpen, onOpen: onConfirmModalOpen, onClose: onConfirmModalClose } = useDisclosure();
  const { validateMutation } = useFile();

  const [state, setState] = useSetState({
    files: []
  } as State);

  useEffect(() => {
    if (props.isOpen) {
      setState({ files: [] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isOpen]);

  useEffect(() => {
    if (validateMutation.isSuccess) {
      props.onClose();
      validateMutation.reset();
      onConfirmModalOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validateMutation.isSuccess]);

  const uploadFile = () => {
    let formData: FormData = new FormData();
    formData.append('matches', state.files[0]);
    validateMutation.mutate(formData);
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (files: File[]) => setState({ files: files }),
    disabled: validateMutation.isLoading,
  });

  return (
    <>
      <MatchesUploadConfirmModal isOpen={isConfirmModalOpen} onClose={onConfirmModalClose} file={state.files[0]} />
      <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload matches</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
              <Flex
                direction={'column'}
                backgroundColor={'gray.100'}
                p={5}
                align={'center'}
                borderRadius={10}
                borderWidth={2}
                borderStyle={'dashed'}
                borderColor={'gray.400'}
                w={'100%'}
                _hover={{
                  borderColor: validateMutation.isLoading ? 'gray.400' : 'gray.500',
                }}
                cursor={validateMutation.isLoading ? 'default' : 'pointer'}
                {...getRootProps({className: 'dropzone'})}
              >
                <input {...getInputProps()} />
                <MdFileUpload size={'40'} opacity={0.6} />
                <Text
                  opacity={0.6}
                  color={state.files.length ? 'green.600' : 'gray.800'}
                >
                  {state.files.length ? state.files[0].name : 'Choose or drop a file here.'}
                </Text>
              </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={'3'} onClick={uploadFile} disabled={!state.files.length || validateMutation.isLoading} isLoading={validateMutation.isLoading}>
              Upload
            </Button>
            <Button onClick={props.onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}