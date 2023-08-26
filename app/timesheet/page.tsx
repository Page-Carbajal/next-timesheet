import WeekRoundUpBox from "../../Components/Timesheet/WeekRoundUpBox";
import {Headers} from "next/dist/compiled/@edge-runtime/primitives";


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


const fetchTimeRecords = async function () {
    // TODO: Make it so the function receives the dates
    // TODO Build the parameters after the fact to replace the dates faster
    // TODO: Set the Api Key from a User value
    const targetUrl = 'https://api.everhour.com/users/1243214/time?from=2023-08-10&to=2023-08-24&limit=500&page=1';
    const headers: HeadersInit = [
        ["X-Api-Key", ""]
    ];
    const options: RequestInit = {
        method: 'GET',
        headers: headers,
    };

    return fetch(targetUrl, options);
}

export default async function TimeSheet() {

    const records = await fetchTimeRecords().then(r => r.json());
    const result: any[] = [];

    records.forEach((entry: any) => {
        const entryDate = new Date(entry.date);
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
            result[weekNumber].tasks[entry.task.id] = {name: taskName, url: taskUrl, time: taskTime, date: entryDate};
        } else {
            result[weekNumber].tasks[entry.task.id].time += taskTime;
        }

    });

    console.log('Result: ', result);

    const under = result.length <= 2 ? 2 : 3;
    const boxStyles = `w-full sm:w-1/2 lg:w-1/${under} px-4 mb-20`;

    return (<>
        <section className="py-12 md:py-24 bg-coolGray-50">
            <div className="container mx-auto px-4">
                <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl tracking-tighter mb-20">TIMESHEET</h1>
                <div className="flex flex-wrap -mx-4 -mb-20">
                    {result.map((record: any, index: any) => (
                        <WeekRoundUpBox key={index} boxClass={boxStyles} record={record}/>
                    ))}
                </div>
            </div>
        </section>
    </>);
}