import { CloseIcon } from '@chakra-ui/icons';
import { IconButton, Link } from '@chakra-ui/react';
import axios from 'axios';
import { ReportType, useReports } from 'hooks/useReports';
import { useSetState } from 'hooks/useSetState';
import { useEffect } from 'react';
import { MdFileDownload } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { uuid } from 'utils/uuid';
import { Dropzone } from "components/shared/match/components/Dropzone";

interface DownloadableReportProps {
  reportType: ReportType;
  hasWritePermissions: boolean;
}

interface State {
  url: string;
}

export const DownloadReportZone = ({ reportType, hasWritePermissions }: DownloadableReportProps) => {
  const [state, setState] = useSetState({
    url: '',
  } as State);
  const { leagueId } = useParams<{ leagueId: uuid }>();
  const { matchId } = useParams<{ matchId: uuid }>();

  const { deleteMutation } = useReports();

  useEffect(() => {
    getFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteReport = () => {
    deleteMutation.mutate(reportType);
  };

  const getFile = async () => {
    const response = await axios.get(`leagues/${leagueId}/matches/${matchId}/reports/${reportType}`);
    setState({ url: response.data });
  };

  return (
    <Dropzone
      text={'Download'}
    >
      <>
        {hasWritePermissions && (
          <IconButton
            onClick={deleteReport}
            size={'sm'}
            aria-label="Delete"
            icon={<CloseIcon />}
            position={'absolute'}
            top={2}
            right={2}
            isLoading={deleteMutation.isLoading}
          />
        )}

        <IconButton
          as={Link}
          href={state.url}
          download
          aria-label="Download"
          icon={<MdFileDownload size={'40'} />}
          opacity={0.6}
        />
      </>
    </Dropzone>
  );
};
