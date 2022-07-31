import { Icon, Spinner, useToast } from '@chakra-ui/react';
import { ReportDto, ReportType, useReports } from 'hooks/useReports';
import { useSetState } from 'hooks/useSetState';
import { useDropzone } from 'react-dropzone';
import { MdFileUpload } from 'react-icons/md';
import { useEffect } from 'react';
import { Dropzone } from 'components/matchPage/components/Dropzone';
import { useTranslation } from 'react-i18next';

interface UploadReportZoneProps {
  reportType: ReportType;
}

interface State {
  files: File[];
  isLoading: boolean;
}

export const UploadReportZone = ({ reportType }: UploadReportZoneProps) => {
  const { postMutation } = useReports();
  const toast = useToast();
  const { t } = useTranslation();

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

  const dropzoneText = state.files.length ? state.files[0].name : t('matchPage.reports.uploadMessage');
  const borderStyle = 'dashed';
  const _hover = { borderColor: postMutation.isLoading ? 'gray.400' : 'gray.500' };
  const cursor = postMutation.isLoading ? 'default' : 'pointer';
  const rootProps = { ...getRootProps({ className: 'dropzone' }) };

  return (
    <Dropzone text={dropzoneText} flexProps={{ borderStyle, _hover, cursor, ...rootProps }}>
      <input {...getInputProps()} />
      {state.isLoading && <Spinner />}

      {!state.isLoading && <Icon as={MdFileUpload} boxSize={35} opacity={0.6} />}
    </Dropzone>
  );
};
