import * as React from "react"
import { QueryClient, QueryClientProvider } from 'react-query';
import { HashRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { ChakraProvider, theme } from "@chakra-ui/react"
import {UnauthorizedHandler} from "./components/other/UnauthorizedHandler";
import {AnimatedTransition} from "./components/other/AnimatedTransition";
import {Paths} from "./other/Paths";
import {Login} from "./pages/Login";
import {RequireAuthRoute} from "./components/other/RequireAuthRoute";
import {Dashboard} from "./pages/Dashboard";
import {AdminDashboard} from "./pages/AdminDashboard";
import {RequireAuthRouteAdmin} from "./components/other/RequireAuthRouteAdmin";

const queryClient = new QueryClient();

export const App = () => (
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <Router basename='/'>
        <UnauthorizedHandler />
        <Routes>
          <Route element={<AnimatedTransition />}>
            <Route element={<RequireAuthRouteAdmin />}>
              <Route path={'*'} element={<Navigate to={Paths.ADMIN_DASHBOARD} />} />
              <Route path={Paths.ADMIN_DASHBOARD} element={<AdminDashboard />} />
            </Route>

            <Route element={<RequireAuthRoute />}>
              <Route path={Paths.DASHBOARD} element={<Dashboard />} />
            </Route>

            <Route path={Paths.LOGIN} element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  </ChakraProvider>
)