import WeekRoundUpBox from "../../Components/Timesheet/WeekRoundUpBox";
import {Headers} from "next/dist/compiled/@edge-runtime/primitives";
import Image from "next/image";


const getWeek = function (d: Date) {
  const date = new Date(d.getFullYear(), 0, 1);
  const days = Math.floor((d - date) / (24 * 60 * 60 * 1000));
  const weekNumber = Math.ceil((days + date.getDay() + 1) / 7);
  return weekNumber;
};


const secondsToHoursMinutes = function (seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  return {hours: hours, minutes: minutes};
}


const secondsToHoursMinutesString = function (seconds: number) {
  const bean = secondsToHoursMinutes(seconds);

  return `${bean.hours}:${bean.minutes}`;
}


const timesheetHeader = async function (totalTime: string) {
  const user = await fetch('http://localhost:3000/api/everhour/current-user').then(r => r.json());

  return (
    <>
      <div className="flex pb-6 mb-6 items-center border-b border-black">
        <Image src={user.avatarUrlLarge} alt={user.name} className="block w-18 xs:w-auto" width={60} height={60}/>
        <div className="ml-9">
          <h3 className="block mb-3 text-sm text-coolGray-800">{user.headline}</h3>
          <h1 className="text-2xl xs:text-3xl sm:text-4xl mb-3">{user.name} - TIMESHEET</h1>
          <span className="block text-lg text-coolGray-600">
            From: <strong>August 10<sup>th</sup> to August 24<sup>th</sup></strong>.
            Total time: <strong>{totalTime}</strong>
          </span>
        </div>
      </div>
    </>
  );
}

const getCurrentDate = function (date: string) {
  const d = (new Date(date));

  d.setMinutes(d.getMinutes() + d.getTimezoneOffset());

  return d;
}


export default async function TimeSheet() {

  const records = await fetch('http://localhost:3000/api/everhour').then(r => r.json());
  const result: any[] = [];

  records.forEach((entry: any) => {
    const entryDate = getCurrentDate(entry.date);
    const weekNumber = getWeek(entryDate);
    const taskName = entry.task.name;
    const taskUrl = entry.task.url;
    const taskTime = entry.time;
    const time = entry.time;

    if (!result[weekNumber]) {
      result[weekNumber] = {
        startDate: entryDate,
        endDate: entryDate,
        total: 0,
        tasks: []
      };
    }

    result[weekNumber].startDate = entryDate < result[weekNumber].startDate ? entryDate : result[weekNumber].startDate;
    result[weekNumber].endDate = entryDate >= result[weekNumber].endDate ? entryDate : result[weekNumber].endDate;
    result[weekNumber].total += time;

    if (!result[weekNumber].tasks[entry.task.id]) {
      result[weekNumber].tasks[entry.task.id] = {
        name: taskName,
        url: taskUrl,
        time: taskTime,
        date: entryDate
      };
    } else {
      result[weekNumber].tasks[entry.task.id].time += taskTime;
    }

  });

  const under = result.length <= 2 ? 2 : 3;
  const boxStyles = `w-1/${under} px-4 mb-20`;
  const timesheetTotalTime = result.reduce((accumulator, w) => {
    return accumulator + w.total;
  }, 0);
  const formattedTimesheetTime = secondsToHoursMinutesString(timesheetTotalTime);

  // const boxStyles = `w-full sm:w-full lg:w-1/${under} px-4 mb-20`;

  return (<>
    <section className="py-12 md:py-24 bg-coolGray-50">
      <div className="container mx-auto px-4">
        {timesheetHeader(formattedTimesheetTime)}
        <div className="flex flex-wrap -mx-4 -mb-20">
          {result.map((record: any, index: any) => (
            <WeekRoundUpBox key={index} boxClass={boxStyles} record={record}/>
          ))}
        </div>
      </div>
    </section>
  </>);
}
