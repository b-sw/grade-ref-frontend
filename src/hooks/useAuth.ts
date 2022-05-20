import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../shared/Paths';
import { tokenExpired } from '../zustand/jwtExpiration';
import useStore from '../zustand/store';
import {uuid} from "../shared/uuid";
import {Role} from "../shared/Role";

export interface LoginResponse {
  id: uuid;
  email: string;
  accessToken: string;
  role: Role;
  firstName: string;
  lastName: string;
}

export default function useAuth() {
  const queryClient = useQueryClient();
  const loginToStore = useStore((state) => state.loginUser);
  const logoutFromStore = useStore((state) => state.logoutUser);
  const user = useStore((state) => state.user);
  const navigate = useNavigate();

  const login = async (googleData: any) => {
    const response = await axios.post('google/auth', { googleToken: googleData.tokenId });
    return response.data;
  }

  const logout = () => {
    logoutFromStore();
    queryClient.clear();
    delete axios.defaults.headers.common['Authorization'];
  };

  const loginMutation = useMutation(login, {
    onSuccess: (response: LoginResponse) => {
      loginToStore(response);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.accessToken;
      navigate(Paths.OWNER_DASHBOARD);
    }
  });

  const isLoggedIn: boolean = !(
    user === null ||
    user.accessToken === null ||
    user.email === null ||
    tokenExpired(user.accessToken)
  );

  const isLoggedInAsAdmin: boolean = isLoggedIn && user!.role === Role.Admin;

  const isLoggedInAsOwner: boolean = isLoggedIn && user!.role === Role.Owner;

  return { loginMutation, isLoggedIn, isLoggedInAsAdmin, isLoggedInAsOwner, logout };
}
