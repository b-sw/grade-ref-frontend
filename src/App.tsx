import * as React from "react"
import { QueryClient, QueryClientProvider } from 'react-query';
import { HashRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { ChakraProvider, theme } from "@chakra-ui/react"
import {UnauthorizedHandler} from "./components/other/UnauthorizedHandler";
import {AnimatedTransition} from "./components/other/AnimatedTransition";
import {Path} from "./other/Paths";
import {Login} from "./pages/Login";
import {Explorer} from "./pages/Explorer";

const queryClient = new QueryClient();

export const App = () => (
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <Router basename='/'>
        <UnauthorizedHandler />
        <Routes>
          <Route element={<AnimatedTransition />}>
            <Route path={'*'} element={<Navigate to={Path.LOGIN} />} />
            <Route path={Path.LOGIN} element={<Login />} />
            <Route path={Path.EXPLORER} element={<Explorer />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  </ChakraProvider>
)
