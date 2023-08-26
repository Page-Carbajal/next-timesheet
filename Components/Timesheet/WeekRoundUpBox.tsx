function formatDate(d: Date) {
  const f = new Intl.DateTimeFormat("en-us", {
    dateStyle: "medium"
  });

  return f.format(d).replace(', 2023', '');
}

const dollarUSLocale = Intl.NumberFormat('en-US')
const sortObjectsByTimeDescending = (array: any, numRecords: number) => {
  const sortedArray = array.sort((a: any, b: any) => b.time - a.time);

  return sortedArray.slice(0, numRecords);
};


const secondsToHoursMinutes = function (seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  return {hours: hours, minutes: minutes};
}


const secondsToHoursMinutesString = function (seconds: number) {
  const bean = secondsToHoursMinutes(seconds);
  const formattedHours = String(bean.hours).padStart(2, '0');
  const formattedMinutes = String(bean.minutes).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
}


const renderTopTask = function (task: any)  {
  const taskSeconds = dollarUSLocale.format(task.time);
  const taskDate = formatDate(task.date);
  return (
    <li><strong>{taskDate}</strong>: {task.name}</li>
  )
}


export default async function WeekRoundUpBox(props: any) {
  const {boxClass, record} = props;
  const currentTasks = Object.keys(record.tasks).map(taskId => record.tasks[taskId]);
  const topTasks = sortObjectsByTimeDescending(currentTasks, 5);
  const startDate = formatDate(record.startDate);
  const endDate = formatDate(record.endDate);
  const totalTasks: number = currentTasks.length; //Object.keys(record.tasks).length;
  const totalSeconds = record.total;
  const formattedTotalSeconds = dollarUSLocale.format(totalSeconds);
  const clockedTime = secondsToHoursMinutesString(totalSeconds);


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
          <h4 className="text-2xl mt-6 mb-1 text-gray-500">Top tasks</h4>
          <ol className="text-sm text-gray-500 list-decimal">
            {topTasks.map((t: any) => renderTopTask(t) ) }
          </ol>
        </div>
      </div>
    </>
  )
}
