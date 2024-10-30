import {
    formatAbsoluteDate,
    formatRelativeDate,
    getDifferenceInDays,
    getRelativeDateParams,
    getToday,
    isDateThisWeek,
    isDateToday,
} from './date';

describe('date helpers', () => {
    const today = new Date('2024-01-04T03:30:00');

    beforeEach(() => {
        cy.clock(today);
    });

    describe('getToday', () => {
        it('clears the time properties of the current date', () => {
            const result = getToday();

            expect(result.getFullYear()).to.equal(2024);
            expect(result.getMonth()).to.equal(0);
            expect(result.getDay()).to.equal(4);
            expect(result.getHours()).to.equal(0);
            expect(result.getMinutes()).to.equal(0);
            expect(result.getSeconds()).to.equal(0);
        });
    });

    describe('getDifferenceInDays', () => {
        it('returns negative difference if target date is in the past', () => {
            const date = new Date('2024-01-01');
            const result = getDifferenceInDays(today, date);

            expect(result).to.equal(-3);
        });

        it('returns zero difference if target date is the current date', () => {
            const date = new Date('2024-01-04');
            const result = getDifferenceInDays(today, date);

            expect(result).to.equal(0);
        });

        it('returns positive difference if target date is in the future', () => {
            const date = new Date('2024-01-10');
            const result = getDifferenceInDays(today, date);

            expect(result).to.equal(6);
        });
    });

    describe('isDateToday', () => {
        it('returns true if date is the current date', () => {
            const date = new Date('2024-01-04');
            const result = isDateToday(date);

            expect(result).to.equal(true);
        });

        it('returns false if date is not the current date', () => {
            const date = new Date('2024-01-05');
            const result = isDateToday(date);

            expect(result).to.equal(false);
        });
    });

    describe('isDateThisWeek', () => {
        it('returns true if date is in the current week and before today', () => {
            const date = new Date('2024-01-03');
            const result = isDateThisWeek(date);

            expect(result).to.equal(true);
        });

        it('returns true if date is today', () => {
            const date = new Date('2024-01-04');
            const result = isDateThisWeek(date);

            expect(result).to.equal(true);
        });

        it('returns true if date is in the current week and after today', () => {
            const date = new Date('2024-01-05');
            const result = isDateThisWeek(date);

            expect(result).to.equal(true);
        });

        it('returns false if date is before the current week', () => {
            const date = new Date('2023-12-30');
            const result = isDateThisWeek(date);

            expect(result).to.equal(false);
        });

        it('returns false if date is after the current week', () => {
            const date = new Date('2024-01-08');
            const result = isDateThisWeek(date);

            expect(result).to.equal(false);
        });
    });

    describe('getRelativeDateParams', () => {
        it('returns days format if date is less than 14 days away', () => {
            const date = new Date('2024-01-17');
            const result = getRelativeDateParams(today, date);

            expect(result).to.deep.equal([13, 'day']);
        });

        it('returns days format if date is less than 14 days ago', () => {
            const date = new Date('2023-12-22');
            const result = getRelativeDateParams(today, date);

            expect(result).to.deep.equal([-13, 'day']);
        });

        it('returns weeks format if date is less than 8 weeks away', () => {
            const date = new Date('2024-02-20');
            const result = getRelativeDateParams(today, date);

            expect(result).to.deep.equal([7, 'week']);
        });

        it('returns weeks format if date is less than 8 weeks ago', () => {
            const date = new Date('2023-11-15');
            const result = getRelativeDateParams(today, date);

            expect(result).to.deep.equal([-7, 'week']);
        });

        it('returns months format if date is less than 12 months away', () => {
            const date = new Date('2024-11-04');
            const result = getRelativeDateParams(today, date);

            expect(result).to.deep.equal([11, 'month']);
        });

        it('returns months format if date is less than 12 months ago', () => {
            const date = new Date('2023-03-04');
            const result = getRelativeDateParams(today, date);

            expect(result).to.deep.equal([-11, 'month']);
        });

        it('returns years format if date is over 12 months away', () => {
            const date = new Date('2025-01-05');
            const result = getRelativeDateParams(today, date);

            expect(result).to.deep.equal([1, 'year']);
        });

        it('returns years format if date is over 12 months ago', () => {
            const date = new Date('2023-01-03');
            const result = getRelativeDateParams(today, date);

            expect(result).to.deep.equal([-1, 'year']);
        });
    });

    describe('formatAbsoluteDate', () => {
        it('returns month and day only if date is in the same year as current date', () => {
            const date = new Date('2024-02-01T00:00:00');
            const result = formatAbsoluteDate(date);

            expect(result).to.equal('Feb 1');
        });

        it('returns month, day, and year if date is not the same year as current date', () => {
            const date = new Date('2025-02-01T00:00:00');
            const result = formatAbsoluteDate(date);

            expect(result).to.equal('Feb 1, 2025');
        });
    });

    describe('formatRelativeDate', () => {
        it('returns date in relative format', () => {
            const date = new Date('2024-02-01');
            const result = formatRelativeDate(date);

            expect(result).to.equal('in 4 weeks');
        });
    });
});
