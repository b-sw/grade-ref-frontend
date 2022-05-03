import {LoginResponse} from "../hooks/useAuth";

export const createAuthSlice = (set: any) => ({
  user: { email: null, accessToken: null, role: null, firstName: null, lastName: null },

  loginUser: (loginResponse: LoginResponse) =>
    set((state: any) => {
      state.user = {
        email: loginResponse.email,
        accessToken: loginResponse.accessToken,
        role: loginResponse.role,
        firstName: loginResponse.firstName,
        lastName: loginResponse.lastName };
    }),

  logoutUser: () =>
    set((state: any) => {
      state.user = { email: null, accessToken: null, role: null, firstName: null, lastName: null };
    }),
});
