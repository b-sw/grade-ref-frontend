import dayjs, { Dayjs } from 'dayjs';
import { useTranslation } from 'react-i18next';

export const useCalendar = () => {
    const { t } = useTranslation();

    const monthNames: string[] = t('months', { returnObjects: true });

    const pageDaysCount = 42;

    /*
     * in dayjs week starts from sunday and is 0 indexed
     */
    const firstDayOffsets: { [key: number]: number } = { 0: 6, 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5 };

    const getCalendarPageDays = (monthOffset: number): Dayjs[] => {
        const day: Dayjs = dayjs().add(monthOffset, 'month');
        const monthStart: Dayjs = dayjs(day).startOf('month');
        const monthStartDay: number = monthStart.day();

        let pageDay: Dayjs = monthStart.subtract(firstDayOffsets[monthStartDay], 'day');

        const days: Dayjs[] = new Array(pageDaysCount);
        for (let i = 0; i < pageDaysCount; i++) {
            days[i] = pageDay;
            pageDay = pageDay.add(1, 'day');
        }

        return days;
    };

    const getMonthName = (monthOffset: number): string => {
        const selectedMonth: Dayjs = dayjs().add(monthOffset, 'month');
        return monthNames[selectedMonth.month()];
    };

    return { getCalendarPageDays, getMonthName };
};
