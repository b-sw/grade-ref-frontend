import { CloseIcon } from '@chakra-ui/icons';
import { IconButton, Link } from '@chakra-ui/react';
import axios from 'axios';
import { ReportType, useReports } from 'hooks/useReports';
import { useSetState } from 'hooks/useSetState';
import { useEffect } from 'react';
import { MdFileDownload } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { uuid } from 'utils/uuid';
import { Dropzone } from 'components/matchPage/components/Dropzone';
import { useTranslation } from 'react-i18next';
import { useLeagueMatch } from 'hooks/useLeagueMatch';
import { MatchStatus } from 'entities/utils/matchStatus';

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
    const { t } = useTranslation();
    const { deleteMutation } = useReports();

    const { query: matchQuery } = useLeagueMatch();
    const matchIsUpcoming = matchQuery.data!.matchStatus === MatchStatus.Upcoming;

    useEffect(() => {
        if (!matchIsUpcoming) {
            getFile();
        }
    }, []);

    const deleteReport = () => {
        deleteMutation.mutate(reportType);
    };

    const getFile = async () => {
        const response = await axios.get(`leagues/${leagueId}/matches/${matchId}/reports/${reportType}`);
        setState({ url: response.data });
    };

    return (
        <Dropzone text={t('matchPage.reports.download')}>
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
                    disabled={matchIsUpcoming}
                />
            )}

            <IconButton
                as={Link}
                href={state.url}
                download
                aria-label="Download"
                icon={<MdFileDownload size={'40'} />}
                opacity={0.6}
                disabled={matchIsUpcoming}
            />
        </Dropzone>
    );
};
