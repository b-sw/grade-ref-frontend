import * as React from "react"
import { QueryClient, QueryClientProvider } from 'react-query';
import { HashRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react"
import {UnauthorizedHandler} from "components/auth/UnauthorizedHandler";
import {AnimatedTransition} from "components/auth/effects/AnimatedTransition";
import {Path} from "utils/Path";
import {RequireAuthRouteRefereeObserver} from "components/auth/RequireAuthRouteRefereeObserver";
import {Dashboard} from "pages/Dashboard";
import {AdminDashboard} from "pages/admin/AdminDashboard";
import {RequireAuthRouteAdmin} from "components/auth/RequireAuthRouteAdmin";
import theme from "./theme/theme";
import { AdminExplorer } from "pages/admin/AdminExplorer";
import {RequireAuthRouteOwner} from "components/auth/RequireAuthRouteOwner";
import {OwnerDashboard} from "pages/owner/OwnerDashboard";
import {Explorer} from "pages/Explorer";
import { ReactQueryDevtools } from 'react-query/devtools';
import {AdminCalendar} from "pages/admin/AdminCalendar";
import {Calendar} from "pages/Calendar";
import {LandingPage} from "pages/LandingPage";
import { ParallaxProvider } from "react-scroll-parallax";
import {MatchPage} from "pages/MatchPage";
import {RequireAuthRoute} from "components/auth/RequireAuthRoute";
import { Conclusions } from 'pages/Conclusions';
import 'styles/styles.css';
import { RequireAuthRouteReferee } from "components/auth/RequireAuthRouteReferee";

const queryClient = new QueryClient();

export const App = () => (
  <ParallaxProvider>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Router basename='/'>
          <UnauthorizedHandler />
          <Routes>
            <Route element={<AnimatedTransition />}>
              <Route path={'*'} element={<Navigate to={Path.LANDING_PAGE} />} />

              <Route path={Path.LANDING_PAGE} element={<LandingPage />} />

              <Route element={<RequireAuthRouteOwner />}>
                <Route path={Path.OWNER_DASHBOARD} element={<OwnerDashboard />} />
              </Route>

              <Route element={<RequireAuthRouteAdmin />}>
                <Route path={Path.ADMIN_EXPLORER} element={<AdminExplorer />} />
                <Route path={Path.ADMIN_DASHBOARD + '/:leagueId'} element={<AdminDashboard />} />
                <Route path={Path.ADMIN_CALENDAR + '/:leagueId'} element={<AdminCalendar />} />
              </Route>

              <Route element={<RequireAuthRouteRefereeObserver />}>
                <Route path={Path.EXPLORER} element={<Explorer />} />
                <Route path={Path.DASHBOARD + '/:leagueId'} element={<Dashboard />} />
                <Route path={Path.CALENDAR + '/:leagueId'} element={<Calendar />} />
              </Route>

              <Route element={<RequireAuthRouteReferee />}>
                <Route path={Path.CONCLUSIONS + '/:leagueId'} element={<Conclusions />} />
              </Route>

              {/* TODO: Consider AuthRoute for LeagueUser. Currently a user won't access dashboard of another league
                    because of failures when loading that league's related queries but this is not a clean solution. */}
              <Route element={<RequireAuthRoute />}>
                <Route path={Path.MATCH_PAGE + '/:leagueId/match/:matchId'} element={<MatchPage />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </ChakraProvider>
  </ParallaxProvider>
)
