function formatDate(d: Date) {
    const f = new Intl.DateTimeFormat("en-us", {
        dateStyle: "medium"
    });

    return f.format(d).replace(', 2023', '');
}


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

    return `${bean.hours}:${bean.minutes}`;
}



export default async function WeekRoundUpBox(props: any) {
    const {boxClass, record} = props;
    const startDate = formatDate(record.startDate);
    const endDate = formatDate(record.endDate);
    const totalTasks: number = Object.keys(record.tasks).length;
    const totalSeconds = record.total;
    const topTasks = sortObjectsByTimeDescending(record.tasks.map( (r:any) => {r.name, r.time} ), 5);
    const clockedTime = secondsToHoursMinutesString(totalSeconds);

    // console.log('Tasks: ', record.tasks, record.tasks.length);

    return (
        <>
            <div className={boxClass}>
                <div className="max-w-sm pr-10">
                    <p>Week summary</p>
                    <h4 className="text-xl mb-6">From: {startDate} to: {endDate} </h4>
                    <h3 className="text-3xl mb-6">{clockedTime}</h3>
                    <ul className="text-lg text-coolGray-600">
                        <li>Total tasks: <strong>{totalTasks}</strong></li>
                        <li>Total seconds: {totalSeconds}</li>
                    </ul>
                    <h4 className="text-2xl mt-6 mb-1 text-gray-500">Top tasks</h4>
                    <ul className="text-sm text-gray-500">
                        {topTasks.map((t: any, index: any) => t.name)}
                    </ul>
                </div>
            </div>
        </>
    )
}