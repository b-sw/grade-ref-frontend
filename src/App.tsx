import * as React from "react"
import { QueryClient, QueryClientProvider } from 'react-query';
import { HashRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react"
import {UnauthorizedHandler} from "./components/other/UnauthorizedHandler";
import {AnimatedTransition} from "./components/other/AnimatedTransition";
import {Paths} from "./other/Paths";
import {Login} from "./pages/Login";
import {RequireAuthRoute} from "./components/other/RequireAuthRoute";
import {Dashboard} from "./pages/Dashboard";
import {AdminDashboard} from "./pages/AdminDashboard";
import {RequireAuthRouteAdmin} from "./components/other/RequireAuthRouteAdmin";
import theme from "./other/theme";
import { AdminExplorer } from "./pages/AdminExplorer";
import {RequireAuthRouteOwner} from "./components/other/RequireAuthRouteOwner";
import {OwnerDashboard} from "./pages/OwnerDashboard";

const queryClient = new QueryClient();

export const App = () => (
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <Router basename='/'>
        <UnauthorizedHandler />
        <Routes>
          <Route element={<AnimatedTransition />}>
            <Route path={'*'} element={<Navigate to={Paths.LOGIN} />} />

            <Route path={Paths.LOGIN} element={<Login />} />

            <Route element={<RequireAuthRouteOwner />}>
              <Route path={Paths.OWNER_DASHBOARD} element={<OwnerDashboard />} />
            </Route>

            <Route element={<RequireAuthRouteAdmin />}>
              <Route path={Paths.ADMIN_EXPLORER} element={<AdminExplorer />} />
              <Route path={Paths.ADMIN_DASHBOARD + '/:leagueId'} element={<AdminDashboard />} />
            </Route>

            <Route element={<RequireAuthRoute />}>
              <Route path={Paths.DASHBOARD} element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  </ChakraProvider>
)
