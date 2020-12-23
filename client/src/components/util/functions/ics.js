function convertDate(date) {
    let dateStr = date.split("-");
    dateStr = dateStr.join("");
    return dateStr;
}

function createCalendar() {
    return "BEGIN:VCALENDAR\n" +
    "PRODID:Calendar\n" +
    "VERSION:2.0\n"
}

function addEvent(uid, dtStart, dtEnd, userName, absenceType, memberNote, admitterNote) {
    let reason = ' is sick';
    if(absenceType.toLowerCase() === 'vacation') {
        reason = ' is on vacation';
    }
    return "BEGIN:VEVENT\n" +
    "UID:" + uid + "\n" +
    "CLASS:PUBLIC\n" +
    "DESCRIPTION:" + userName + reason + "\n" +
    "MEMBERNOTE:" + memberNote + "\n" +
    "ADMITTERNOTE:" + admitterNote + "\n" +
    "DTSTART;VALUE=DATE:" + convertDate(dtStart) + "\n" +
    "DTEND;VALUE=DATE:" +  convertDate(dtEnd) + "\n" +
    "SUMMARY:" + userName + reason + "\n" +
    "END:VEVENT\n"
}

function endCalendar() {
    return "END:VCALENDAR\n"
}

export { createCalendar, addEvent, endCalendar }