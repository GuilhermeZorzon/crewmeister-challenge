import { dateToString } from '../components/util/functions/dates.js';
import { createCalendar, addEvent, endCalendar } from '../components/util/functions/ics.js';
import { getValues } from '../components/util/functions/values.js';

const valuesArray = [
    {'label': 'hey', 'value': 23},
    {'label': 'ho', 'value': 2},
    {'label': 'lets', 'value': 6},
    {'label': 'go', 'value': 7}
]

describe("dates", () => {
    it("should return correct dates in string format YY-mm-dd", () => {
        expect(dateToString(new Date('2020-12-25'), false)).toEqual('2020-12-25');

        expect(dateToString(new Date('2020-12-31'), false)).toEqual('2020-12-31');

        expect(dateToString(new Date('2020-01-01'), false)).toEqual('2020-01-01');
    });
});

describe("ics", () => {
    it("should return the correct string for calendar creation", () => {
        expect(createCalendar()).toEqual("BEGIN:VCALENDAR\n" + "PRODID:Calendar\n" + "VERSION:2.0\n")
    });
    
    it("should return the correct string for calendar ending", () => {
        expect(endCalendar()).toEqual("END:VCALENDAR\n")
    });
    
    it("should return the correct string for calendar event", () => {
        expect(addEvent(10, '2020-12-24', '2020-12-25', 'Guilherme', 'vacation', '', '')).toEqual(
            "BEGIN:VEVENT\n" +
            "UID:10\n" +
            "CLASS:PUBLIC\n" +
            "DESCRIPTION:Guilherme is on vacation\n" +
            "MEMBERNOTE:\n" +
            "ADMITTERNOTE:\n" +
            "DTSTART;VALUE=DATE:20201224\n" +
            "DTEND;VALUE=DATE:20201225\n" +
            "SUMMARY:Guilherme is on vacation\n" +
            "END:VEVENT\n"
        )
    });
});

describe("values", () => {
    it("should return correct values", () => {
        expect(getValues([])).toEqual([]);

        expect(getValues(null)).toEqual(null);

        expect(getValues(valuesArray)).toEqual([23, 2, 6, 7]);
    });
});