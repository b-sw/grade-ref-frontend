import axios from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Path } from '../other/Paths';
import { tokenExpired } from '../zustand/jwtExpiration';
import useStore from '../zustand/store';
import {uuid} from "../other/uuid";

interface LoginResponse {
  id: uuid;
  email: string;
  accessToken: string;
}

export default function useAuth() {
  const loginToStore = useStore((state) => state.loginUser);
  const user = useStore((state) => state.user);
  const navigate = useNavigate();

  const login = async () => {
    const response = await axios.get('google');
    console.log(response);
    return response.data;
  };

  const loginMutation = useMutation(login, {
    onSuccess: (response: LoginResponse) => {
      loginToStore(response.email, response.accessToken);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.accessToken;
      navigate(Path.EXPLORER);
    },
  });

  const isLoggedIn: boolean = !(
    user === null ||
    user.accessToken === null ||
    user.email === null ||
    tokenExpired(user.accessToken)
  );

  return { loginMutation, isLoggedIn };
}
