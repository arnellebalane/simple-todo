export const getToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
};

export const getDifferenceInDays = (base, to) => {
    return Math.ceil((to.getTime() - base.getTime()) / 1000 / 60 / 60 / 24);
};

export const isDateToday = (date) => {
    const today = getToday();
    return getDifferenceInDays(today, date) === 0;
};

export const isDateThisWeek = (date) => {
    const today = getToday();
    const sun = new Date(today);
    const sat = new Date(today);
    sun.setDate(today.getDate() - today.getDay());
    sat.setDate(today.getDate() + (7 - today.getDay() - 1));
    return sun <= date && date <= sat;
};

export const getRelativeDateParams = (from, date) => {
    const days = getDifferenceInDays(from, date);
    if (-14 < days && days < 14) {
        return [days, 'day'];
    }
    const weeks = Math.round(days / 7);
    if (-8 < weeks && weeks < 8) {
        return [weeks, 'week'];
    }
    const months = Math.round(weeks / 4);
    if (-12 < months && months < 12) {
        return [months, 'month'];
    }
    const years = Math.round(months / 12);
    return [years, 'year'];
};

export const formatAbsoluteDate = (date) => {
    const today = getToday();
    const formatterOptions = {
        month: 'short',
        day: 'numeric',
    };
    if (date.getFullYear() !== today.getFullYear()) {
        formatterOptions.year = 'numeric';
    }
    const formatter = new Intl.DateTimeFormat(undefined, formatterOptions);
    return formatter.format(date);
};

export const formatRelativeDate = (date) => {
    const today = getToday();
    const params = getRelativeDateParams(today, date);
    const formatter = new Intl.RelativeTimeFormat(undefined, {
        style: 'long',
        numeric: 'auto',
    });
    return formatter.format(...params);
};
