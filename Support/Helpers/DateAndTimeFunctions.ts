export const formatDate = function (d: Date) {
  const f = new Intl.DateTimeFormat("en-us", {
    dateStyle: "medium"
  });

  return f.format(d).replace(', 2023', '');
}


export const getCurrentDate = function (date: string) {
  const d = (new Date(date));

  d.setMinutes(d.getMinutes() + d.getTimezoneOffset());

  return d;
}


export const getWeek = function (d: Date) {
  const date = new Date(d.getFullYear(), 0, 1);
  const days = Math.floor((d - date) / (24 * 60 * 60 * 1000));
  const weekNumber = Math.ceil((days + date.getDay() + 1) / 7);
  return weekNumber;
};


export const secondsToHoursMinutes = function (seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  return {hours: hours, minutes: minutes};
}


export const secondsToHoursMinutesString = function (seconds: number) {
  const bean = secondsToHoursMinutes(seconds);
  const formattedHours = String(bean.hours).padStart(2, '0');
  const formattedMinutes = String(bean.minutes).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
}
