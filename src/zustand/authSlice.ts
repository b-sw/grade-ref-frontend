export const createAuthSlice = (set: any) => ({
  user: { email: null, accessToken: null },
  loginUser: (newEmail: string, newToken: string) =>
    set((state: any) => {
      state.user = { email: newEmail, accessToken: newToken };
    }),
  logoutUser: () =>
    set((state: any) => {
      state.user = { email: null, accessToken: null };
    }),
});
