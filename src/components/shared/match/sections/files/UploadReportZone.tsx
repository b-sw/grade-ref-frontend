import { Flex, Spinner, Text, useToast } from '@chakra-ui/react';
import { ReportDto, ReportType, useReports } from 'hooks/useReports';
import { useSetState } from 'hooks/useSetState';
import { useDropzone } from 'react-dropzone';
import { MdFileUpload } from 'react-icons/md';
import { useEffect } from "react";

interface UploadFileZoneProps {
  reportType: ReportType;
}

interface State {
  files: File[];
  isLoading: boolean;
}

export const UploadFileZone = ({ reportType }: UploadFileZoneProps) => {
  const { postMutation } = useReports();
  const toast = useToast();

  const [state, setState] = useSetState({
    files: [],
    isLoading: false,
  } as State);

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop: (files: File[]) => {
      setState({ files: files });
      uploadFile(files[0]);
    },
    disabled: postMutation.isLoading,
    accept: {
      'application/pdf': ['.pdf'],
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileRejections]);

  const uploadFile = (file: any) => {
    const formData = new FormData();
    formData.append('report', file);

    const reportDto: ReportDto = {
      fileFormData: formData,
      type: reportType,
    };

    postMutation.mutate(reportDto);
    setState({ isLoading: true });
  };

  return (
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
      h={'100%'}
      _hover={{
        borderColor: postMutation.isLoading ? 'gray.400' : 'gray.500',
      }}
      cursor={postMutation.isLoading ? 'default' : 'pointer'}
      {...getRootProps({ className: 'dropzone' })}
    >
      <input {...getInputProps()} />
      {state.isLoading && <Spinner />}
      {!state.isLoading && <MdFileUpload size={'40'} opacity={0.6} />}

      <Text opacity={0.6} color={state.files.length ? 'green.600' : 'gray.800'}>
        {state.files.length ? state.files[0].name : 'Choose or drop a file here.'}
      </Text>
    </Flex>
  );
};
