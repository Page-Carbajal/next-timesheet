export const dynamic = 'force-dynamic';


import Image from "next/image";
import WeekRoundUpBox from "../../Components/Timesheet/WeekRoundUpBox";
import {getWeek, formatDate, getCurrentDate, secondsToHoursMinutesString} from "../../Support/Helpers/DateAndTimeFunctions";


const parseRecords = (records: any[]) => {
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

  return result;
}


const timesheetHeader = async function (totalTime: number, startDate: Date, endDate: Date) {
  const user = await fetch('http://localhost:3000/api/everhour/current-user').then(r => r.json());
  const timesheetTotalTime = secondsToHoursMinutesString(totalTime);
  const sDate = formatDate(startDate);
  const eDate = formatDate(endDate);

  return (
    <>
      <div className="flex pb-6 mb-6 items-center border-b border-black">
        <Image src={user.avatarUrlLarge} alt={user.name} className="block w-18 xs:w-auto" width={80} height={80}/>
        <div className="ml-9">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl mb-3">{user.name} - TIMESHEET</h1>
          <span className="block mb-3 text-sm text-coolGray-800">{user.headline}</span>
          <span className="block text-lg text-coolGray-600">
            From: <strong>{sDate} to {eDate}</strong>.
            Total time: <strong>{timesheetTotalTime}</strong>
          </span>
        </div>
      </div>
    </>
  );
}


export default async function TimeSheet() {

  const records = await fetch('http://localhost:3000/api/everhour').then(r => r.json());
  const weekGroups = parseRecords(records);
  const under = weekGroups.length <= 2 ? 2 : 3;
  const boxStyles = `w-1/${under} px-4 mb-20`;
  const timesheetTotalTime = weekGroups.reduce((accumulator, w) => {
    return accumulator + w.total;
  }, 0);
  const minDate = getCurrentDate(records.reduce((min, p) => p.date < min ? p.date : min, records[0].date));
  const maxDate = getCurrentDate(records.reduce((max, p) => p.date > max ? p.date : max, records[0].date));

  return (<>
    <section className="py-12 md:py-24 bg-coolGray-50">
      <div className="container mx-auto px-4">
        {timesheetHeader(timesheetTotalTime, minDate, maxDate)}
        <div className="flex flex-wrap -mx-4 -mb-20">
          {weekGroups.map((record: any, index: any) => (
            <WeekRoundUpBox key={index} boxClass={boxStyles} record={record}/>
          ))}
        </div>
      </div>
    </section>
  </>);
}
