import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { createAuthSlice } from './authSlice';
import axios from 'axios';
import { createCalendarSlice } from './calendarSlice';

const store = (set: any) => ({
    ...createAuthSlice(set),
    ...createCalendarSlice(set),
});

export const useStore = create(
    persist(devtools(store, { name: 'hwdp' }), {
        name: 'auth-storage',
    }),
);

axios.defaults.headers.common['Authorization'] = 'Bearer ' + useStore.getState().user.accessToken;
