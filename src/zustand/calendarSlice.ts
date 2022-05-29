import dayjs, { Dayjs } from 'dayjs';

export const createCalendarSlice = (set: any) => ({
  selectedDate: dayjs(),
  setSelectedDate: (newDate: Dayjs) =>
    set((state: any) => {
      state.selectedDate = newDate;
    }),
});
