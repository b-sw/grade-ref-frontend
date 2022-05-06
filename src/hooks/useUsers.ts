import {useToast} from "@chakra-ui/react";
import axios from "axios";
import {QueryClient, useMutation, useQuery, useQueryClient} from "react-query";
import {uuid} from "../other/uuid";
import {User} from "../entities/User";
import {Role} from "../other/Role";

const REFEREES_QUERY_KEY = 'referees_qk';
const OBSERVERS_QUERY_KEY = 'observers_qk'

export const useUsers = () => {
  const toast = useToast();
  const queryClient: QueryClient = useQueryClient();

  const getReferees = async (): Promise<User[]> => {
    const response = await axios.get(`users/referees`);
    return response.data;
  }

  const getObservers = async (): Promise<User[]> => {
    const response = await axios.get(`users/observers`);
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

  const refereesQuery = useQuery(REFEREES_QUERY_KEY, getReferees);
  const observersQuery = useQuery(OBSERVERS_QUERY_KEY, getObservers);

  const postMutation = useMutation(postUser, {
    onSuccess: (user: User) => {
      const queryKey: any = user.role === Role.Referee ? REFEREES_QUERY_KEY : OBSERVERS_QUERY_KEY;
      queryClient.setQueryData(queryKey, (old: any) => [...old, user]);

      toast({
        title: `Successfully added ${user.role}`,
        status: 'success',
        position: 'bottom-right',
        duration: 2000,
      });
    },
  });

  const updateMutation = useMutation(updateUser, {
    onSuccess: (user: User) => {
      const queryKey: any = user.role === Role.Referee ? REFEREES_QUERY_KEY : OBSERVERS_QUERY_KEY;
      const users: User[] = queryClient.getQueryData(queryKey)!;
      const index: number = users.findIndex((u: User) => u.id === user.id);
      users[index] = user;
      queryClient.setQueryData(queryKey, (_) => users);

      toast({
        title: `Successfully updated ${user.role}`,
        status: 'success',
        position: 'bottom-right',
        duration: 2000,
      });
    },
  });

  const deleteMutation = useMutation(deleteUser, {
    onSuccess: (user: User) => {
      const queryKey: any = user.role === Role.Referee ? REFEREES_QUERY_KEY : OBSERVERS_QUERY_KEY;
      queryClient.setQueryData(queryKey, (old: any) => old.filter((u: User) => u.id !== user.id));

      toast({
        title: `Successfully deleted ${user.role}`,
        status: 'success',
        position: 'bottom-right',
        duration: 2000,
      });
    },
  });

  return { refereesQuery, observersQuery, postMutation, updateMutation, deleteMutation }
}