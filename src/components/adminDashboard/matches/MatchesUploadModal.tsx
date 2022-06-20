import {Button, Flex, Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { MdFileUpload } from 'react-icons/md';
import {useSetState} from "../../../hooks/useSetState";
import {useEffect} from "react";
import {useFile} from "../../../hooks/useFile";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface State {
  files: File[];
}

export const MatchesUploadModal = (props: Props) => {
  const { postMutation } = useFile();

  const [state, setState] = useSetState({
    files: []
  } as State);

  useEffect(() => {
    setState({ files: [] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isOpen]);

  const uploadFile = () => {
    let formData: FormData = new FormData();
    formData.append('matches', state.files[0]);
    postMutation.mutate(formData);
    setState({ files: [] });
    props.onClose();
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (files: File[]) => setState({ files: files })
  });

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Upload matches</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex>
            <Spacer />

            <Flex
              direction={'column'}
              backgroundColor={'gray.100'}
              p={5}
              align={'center'}
              borderRadius={10}
              borderWidth={2}
              borderStyle={'dashed'}
              borderColor={'gray.400'}
              w={'70%'}
              _hover={{
                borderColor: 'gray.500',
              }}
              cursor={'pointer'}
              {...getRootProps({className: 'dropzone'})}
            >
              <input {...getInputProps()} />
              <MdFileUpload size={'40'} opacity={0.6} />
              <Text opacity={0.6}>{state.files.length ? state.files[0].name : 'Choose or drop a file here.'}</Text>
            </Flex>

            <Spacer />
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={'3'} onClick={uploadFile} disabled={!state.files.length} isLoading={postMutation.isLoading}>
            Upload
          </Button>
          <Button onClick={props.onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}