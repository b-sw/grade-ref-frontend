import * as React from "react"
import { QueryClient, QueryClientProvider } from 'react-query';
import { HashRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react"
import {UnauthorizedHandler} from "./components/other/UnauthorizedHandler";
import {AnimatedTransition} from "./components/other/AnimatedTransition";
import {Path} from "./shared/Path";
import {RequireAuthRouteRefereeObserver} from "./components/other/RequireAuthRouteRefereeObserver";
import {Dashboard} from "./pages/Dashboard";
import {AdminDashboard} from "./pages/admin/AdminDashboard";
import {RequireAuthRouteAdmin} from "./components/other/RequireAuthRouteAdmin";
import theme from "./theme/theme";
import { AdminExplorer } from "./pages/admin/AdminExplorer";
import {RequireAuthRouteOwner} from "./components/other/RequireAuthRouteOwner";
import {OwnerDashboard} from "./pages/owner/OwnerDashboard";
import {Explorer} from "./pages/Explorer";
import { ReactQueryDevtools } from 'react-query/devtools';
import {AdminCalendar} from "./pages/admin/AdminCalendar";
import {Calendar} from "./pages/Calendar";
import {LandingPage} from "./pages/LandingPage";
import { ParallaxProvider } from "react-scroll-parallax";
import {MatchDetails} from "./pages/MatchDetails";

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
                <Route path={Path.MATCH_DETAILS + '/:leagueId/match/:matchId'} element={<MatchDetails />} />
              </Route>

              <Route element={<RequireAuthRouteRefereeObserver />}>
                <Route path={Path.EXPLORER} element={<Explorer />} />
                <Route path={Path.DASHBOARD + '/:leagueId'} element={<Dashboard />} />
                <Route path={Path.CALENDAR + '/:leagueId'} element={<Calendar />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </ChakraProvider>
  </ParallaxProvider>
)
