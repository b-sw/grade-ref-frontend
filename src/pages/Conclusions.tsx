import { HeaderPanel } from 'components/header/HeaderPanel';
import { PageTitle } from 'utils/PageTitle';
import { useUserFeatures } from 'hooks/useUserFeatures';
import { LoadingOverlay } from 'pages/LoadingOverlay';
import { ConclusionsPanel } from 'components/conclusions/ConclusionsPanel';
import { useLeagues } from 'hooks/useLeagues';
import { Page } from 'components/generic/Page';

export const Conclusions = () => {
    const { query: conclusionsQuery } = useUserFeatures({ enableAutoRefetch: true });
    const { query: leaguesQuery } = useLeagues({ enableAutoRefetch: true });

    if ([conclusionsQuery, leaguesQuery].some((query) => query.isLoading)) {
        return <LoadingOverlay />;
    }

    return (
        <Page>
            <HeaderPanel pageTitle={PageTitle.Conclusions} />
            <ConclusionsPanel />
        </Page>
    );
};
