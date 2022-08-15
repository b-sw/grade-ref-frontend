import { LoginResponse } from 'hooks/useAuth';
import { Role } from 'utils/Role';
import { uuid } from 'utils/uuid';

interface AuthSliceState {
  user: {
    id: uuid | null;
    email: string | null;
    accessToken: string | null;
    role: Role | null;
    firstName: string | null;
    lastName: string | null;
  };
}

export const createAuthSlice = (set: any) => ({
  user: {
    id: null,
    email: null,
    accessToken: null,
    role: null,
    firstName: null,
    lastName: null,
  },

  loginUser: (loginResponse: LoginResponse) =>
    set((state: AuthSliceState) => {
      state.user = {
        id: loginResponse.id,
        email: loginResponse.email,
        accessToken: loginResponse.accessToken,
        role: loginResponse.role,
        firstName: loginResponse.firstName,
        lastName: loginResponse.lastName,
      };
    }),

  logoutUser: () =>
    set((state: AuthSliceState) => {
      state.user = {
        id: null,
        email: null,
        accessToken: null,
        role: null,
        firstName: null,
        lastName: null,
      };
    }),
});
