import {useSetState} from "./useSetState";
import {MOBILE_WINDOW_WIDTH} from "../components/landingPage/hero/Hero";
import { useEffect } from "react";

interface State {
  isMobile: boolean;
}

export const useMobile = () => {
  const [state, setState] = useSetState({
    isMobile: window.innerWidth < MOBILE_WINDOW_WIDTH
  } as State);

  useEffect(() => {
    window.addEventListener('resize', () => setState({ isMobile: window.innerWidth < MOBILE_WINDOW_WIDTH }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isMobile: state.isMobile };
}