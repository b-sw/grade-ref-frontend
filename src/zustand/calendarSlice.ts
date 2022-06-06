import dayjs, { Dayjs } from 'dayjs';

export const createCalendarSlice = (set: any) => ({
  selectedDate: dayjs(),
  calendarYear: dayjs().year(),
  setSelectedDate: (newDate: Dayjs) =>
    set((state: any) => {
      state.selectedDate = newDate;
    }),
  setCalendarYear: (newYear: number) =>
    set((state: any) => {
      state.calendarYear = newYear;
    }),
});
