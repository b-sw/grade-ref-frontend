import {useToast} from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import {QueryClient, useMutation, useQuery, useQueryClient} from "react-query";
import {uuid} from "utils/uuid";
import {User} from "entities/User";
import {Role} from "utils/Role";
import {toastError} from "./utils/toastError";
import {useReferees} from "./useReferees";
import {useObservers} from "./useObservers";

export const REFEREES_QUERY_KEY = 'referees_qk';
export const OBSERVERS_QUERY_KEY = 'observers_qk';
export const ADMINS_QUERY_KEY = 'admins_qk';

export interface Props {
  enableAutoRefetch: boolean;
}

const queryKeys: { [id: string] : any } = {};
queryKeys[Role.Admin] = ADMINS_QUERY_KEY;
queryKeys[Role.Referee] = REFEREES_QUERY_KEY;
queryKeys[Role.Observer] = OBSERVERS_QUERY_KEY;

export const useUsers = (props?: Props) => {
  const toast = useToast();
  const queryClient: QueryClient = useQueryClient();

  const getAdmins = async (): Promise<User[]> => {
    const response = await axios.get(`users/admins`);
    return response.data;
  }

  const postUser = async (user: User): Promise<User> => {
    const response = await axios.post(`users`, user);
    return response.data;
  }

  const updateUser = async (user: User): Promise<User> => {
    const response = await axios.put(`users/${user.id}`, user);
    return response.data;
  }

  const deleteUser = async (userId: uuid): Promise<User> => {
    const response = await axios.delete(`users/${userId}`);
    return response.data;
  }

  const { refereesQuery } = useReferees(props);

  const { observersQuery } = useObservers(props);

  const adminsQuery = useQuery(
    ADMINS_QUERY_KEY,
    getAdmins,
    { enabled: props ? props.enableAutoRefetch : false },
  );

  const postMutation = useMutation(postUser, {
    onSuccess: (user: User) => {
      const queryKey: any = queryKeys[user.role];
      queryClient.setQueryData(queryKey, (old: any) => [...old, user]);

      toast({
        title: `Successfully added ${user.role}`,
        status: 'success',
        position: 'bottom-right',
        duration: 2000,
      });
    },
    onError: (error: AxiosError, _variables, _context) => toastError(toast, error),
  });

  const updateMutation = useMutation(updateUser, {
    onSuccess: (user: User) => {
      const queryKey: any = queryKeys[user.role];
      queryClient.setQueryData(queryKey, (old: any) => [...old.filter((u: User) => u.id !== user.id), user]);

      toast({
        title: `Successfully updated ${user.role}`,
        status: 'success',
        position: 'bottom-right',
        duration: 2000,
      });
    },
    onError: (error: AxiosError, _variables, _context) => toastError(toast, error),
  });

  const deleteMutation = useMutation(deleteUser, {
    onSuccess: (user: User) => {
      const queryKey: any = queryKeys[user.role];
      queryClient.setQueryData(queryKey, (old: any) => old.filter((u: User) => u.id !== user.id));

      toast({
        title: `Successfully deleted ${user.role}`,
        status: 'success',
        position: 'bottom-right',
        duration: 2000,
      });
    },
    onError: (error: AxiosError, _variables, _context) => toastError(toast, error),
  });

  return { refereesQuery, observersQuery, adminsQuery, postMutation, updateMutation, deleteMutation }
}