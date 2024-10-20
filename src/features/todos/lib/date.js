export const today = new Date();
today.setHours(0, 0, 0, 0);

export const getDifferenceInDays = (base, to) => {
    return Math.ceil((to.getTime() - base.getTime()) / 1000 / 60 / 60 / 24);
};

export const isDateToday = (date) => {
    return getDifferenceInDays(today, date) === 0;
};

export const isDateThisWeek = (date) => {
    const sun = new Date(today);
    const sat = new Date(today);
    sun.setDate(today.getDate() - today.getDay());
    sat.setDate(today.getDate() + (7 - today.getDay() - 1));
    return sun <= date && date <= sat;
};

export const getRelativeDateParams = (date) => {
    const days = getDifferenceInDays(today, date);
    if (days < 31) {
        return [days, 'day'];
    }
    const weeks = Math.round(days / 7);
    if (weeks < 4) {
        return [weeks, 'week'];
    }
    const months = Math.round(weeks / 4);
    if (months < 12) {
        return [months, 'month'];
    }
    const years = Math.round(months / 12);
    return [years, 'year'];
};

export const formatAbsoluteDate = (date) => {
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
    const params = getRelativeDateParams(today, date);
    const formatter = new Intl.RelativeTimeFormat(undefined, {
        style: 'long',
        numeric: 'auto',
    });
    return formatter.format(...params);
};
