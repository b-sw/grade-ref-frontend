import {
  Button,
  Flex,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { MdFileUpload } from 'react-icons/md';
import { useSetState } from 'hooks/useSetState';
import { useEffect } from 'react';
import { useFile } from 'hooks/useFile';
import { MatchesUploadConfirmModal } from 'components/admin/matches/MatchesUploadConfirmModal';

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
  const toast = useToast();

  const [state, setState] = useSetState({
    files: [],
  } as State);

  useEffect(() => {
    if (props.isOpen) {
      setState({ files: [] });
    }
  }, [props.isOpen]);

  useEffect(() => {
    if (validateMutation.isSuccess) {
      props.onClose();
      validateMutation.reset();
      onConfirmModalOpen();
    }
  }, [validateMutation.isSuccess]);

  const uploadFile = () => {
    const formData: FormData = new FormData();
    formData.append('matches', state.files[0]);
    validateMutation.mutate(formData);
  };

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop: (files: File[]) => setState({ files: files }),
    disabled: validateMutation.isLoading,
    accept: {
      'text/csv': ['.csv'],
    },
    maxSize: 100000,
    multiple: false,
    maxFiles: 1,
  });

  useEffect(() => {
    if (fileRejections.length) {
      fileRejections.forEach((fileRejection) => {
        fileRejection.errors.forEach((error) => {
          toast({
            title: error.message,
            status: 'error',
            duration: 5000,
          });
        });
      });
    }
  }, [fileRejections]);

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
              {...getRootProps({ className: 'dropzone' })}
            >
              <input {...getInputProps()} />
              <MdFileUpload size={'40'} opacity={0.6} />
              <Text opacity={0.6} color={state.files.length ? 'green.600' : 'gray.800'}>
                {state.files.length ? state.files[0].name : 'Choose or drop a file here.'}
              </Text>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={'3'}
              onClick={uploadFile}
              disabled={!state.files.length || validateMutation.isLoading}
              isLoading={validateMutation.isLoading}
            >
              Upload
            </Button>
            <Button onClick={props.onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
