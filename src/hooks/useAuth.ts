import axios, { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Path } from 'utils/Path';
import { useStore } from 'zustandStore/store';
import { uuid } from 'utils/uuid';
import { Role } from 'utils/Role';
import { toastError } from './utils/toastError';
import { useToast } from '@chakra-ui/react';
import { tokenExpired } from 'zustandStore/jwtExpiration';

export interface LoginResponse {
  id: uuid;
  email: string;
  accessToken: string;
  role: Role;
  firstName: string;
  lastName: string;
}

export default function useAuth() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const loginToStore = useStore((state) => state.loginUser);
  const logoutFromStore = useStore((state) => state.logoutUser);
  const user = useStore((state) => state.user);
  const navigate = useNavigate();

  const login = async (googleData: any) => {
    const response = await axios.post('google/auth', { googleToken: googleData.tokenId });
    return response.data;
  };

  const logout = () => {
    logoutFromStore();
    queryClient.clear();
    delete axios.defaults.headers.common['Authorization'];
  };

  const loginMutation = useMutation(login, {
    onSuccess: (response: LoginResponse) => {
      loginToStore(response);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.accessToken;
      navigate(Path.OWNER_DASHBOARD);
    },
    onError: (error: AxiosError) => toastError(toast, error),
  });

  const isLoggedIn = !(
    user === null ||
    user.accessToken === null ||
    user.email === null ||
    tokenExpired(user.accessToken)
  );

  const isLoggedInAsAdmin: boolean = isLoggedIn && user!.role === Role.Admin;
  const isLoggedInAsOwner: boolean = isLoggedIn && user!.role === Role.Owner;
  const isLoggedInAsReferee: boolean = isLoggedIn && user!.role === Role.Referee;
  const isLoggedInAsObserver: boolean = isLoggedIn && user!.role === Role.Observer;

  return {
    loginMutation,
    isLoggedIn,
    isLoggedInAsAdmin,
    isLoggedInAsOwner,
    isLoggedInAsReferee,
    isLoggedInAsObserver,
    logout,
  };
}
