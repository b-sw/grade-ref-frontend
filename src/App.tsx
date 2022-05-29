import * as React from "react"
import { QueryClient, QueryClientProvider } from 'react-query';
import { HashRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react"
import {UnauthorizedHandler} from "./components/other/UnauthorizedHandler";
import {AnimatedTransition} from "./components/other/AnimatedTransition";
import {Path} from "./shared/Path";
import {Login} from "./pages/Login";
import {RequireAuthRouteRefereeObserver} from "./components/other/RequireAuthRouteRefereeObserver";
import {Dashboard} from "./pages/Dashboard";
import {AdminDashboard} from "./pages/AdminDashboard";
import {RequireAuthRouteAdmin} from "./components/other/RequireAuthRouteAdmin";
import theme from "./theme/theme";
import { AdminExplorer } from "./pages/AdminExplorer";
import {RequireAuthRouteOwner} from "./components/other/RequireAuthRouteOwner";
import {OwnerDashboard} from "./pages/OwnerDashboard";
import {Explorer} from "./pages/Explorer";
import { ReactQueryDevtools } from 'react-query/devtools';
import {AdminCalendar} from "./pages/AdminCalendar";

const queryClient = new QueryClient();

export const App = () => (
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Router basename='/'>
        <UnauthorizedHandler />
        <Routes>
          <Route element={<AnimatedTransition />}>
            <Route path={'*'} element={<Navigate to={Path.LOGIN} />} />

            <Route path={Path.LOGIN} element={<Login />} />

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
            </Route>
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  </ChakraProvider>
)
