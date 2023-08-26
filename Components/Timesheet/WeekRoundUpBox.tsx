import {dollarUSLocale} from "../../Support/Helpers/NumberFormatFunctions";
import {sortObjectsByTimeDescending} from "../../Support/Helpers/ArrayFunctions";
import {formatDate, secondsToHoursMinutesString} from "../../Support/Helpers/DateAndTimeFunctions";


const renderTopTask = function (task: any)  {
  const taskSeconds = dollarUSLocale.format(task.time);
  const taskDate = formatDate(task.date);
  return (
    <li><strong>{taskDate}</strong>: {task.name}</li>
  )
}


const renderDayDetails = function (day: any)  {
  const taskSeconds = dollarUSLocale.format(day.time);
  const totalTime = secondsToHoursMinutesString(day.time);
  const taskDate = formatDate(day.date);
  return (
    <li>
      <strong>{taskDate}</strong> &ndash;
      Time: <strong>{totalTime}</strong>, &nbsp;
      Tasks: <strong>{day.count}</strong>
    </li>
  )
}


export default async function WeekRoundUpBox(props: any) {
  const {boxClass, record} = props;
  const currentTasks = Object.keys(record.tasks).map(taskId => record.tasks[taskId]);
  const currentDays = Object.keys(record.days).map(day => record.days[day]);
  const topTasks = sortObjectsByTimeDescending(currentTasks, 5);
  const startDate = formatDate(record.startDate);
  const endDate = formatDate(record.endDate);
  const totalTasks: number = currentTasks.length; //Object.keys(record.tasks).length;
  const totalSeconds = record.total;
  const formattedTotalSeconds = dollarUSLocale.format(totalSeconds);
  const clockedTime = secondsToHoursMinutesString(totalSeconds);

  console.log('Days: ', currentDays);

  return (
    <>
      <div className={boxClass}>
        <div className="max-w-sm pr-10">
          <h3 className="text-3xl mb-6">{clockedTime}</h3>
          <p>Week summary</p>
          <h4 className="text-xl mb-6">From: {startDate} to: {endDate} </h4>
          <ul className="text-lg text-coolGray-600">
            <li>Total tasks: <strong>{totalTasks}</strong></li>
            <li>Total seconds: <strong>{formattedTotalSeconds}</strong></li>
          </ul>

          <h4 className="text-2xl mt-6 mb-1 text-gray-500">Breakdown by Day</h4>
          <ol className="text-sm text-gray-500">
            {currentDays.map((t: any) => renderDayDetails(t) ) }
          </ol>

          <h4 className="text-2xl mt-6 mb-1 text-gray-500">Top tasks</h4>
          <ol className="text-sm text-gray-500 list-decimal">
            {topTasks.map((t: any) => renderTopTask(t) ) }
          </ol>
        </div>
      </div>
    </>
  )
}
