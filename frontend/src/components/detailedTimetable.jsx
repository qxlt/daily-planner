const HOUR_HEIGHT = 72;
const MINUTE_HEIGHT = HOUR_HEIGHT / 60;

const sampleTasks = [
  {
    id: 1,
    title: "Morning workout",
    start: "06:30",
    end: "07:30"
  },
  {
    id: 2,
    title: "Deep work block",
    start: "09:00",
    end: "11:30"
  },
  {
    id: 3,
    title: "Lunch",
    start: "12:30",
    end: "13:15"
  },
  {
    id: 4,
    title: "Design review",
    start: "14:00",
    end: "15:00"
  },
  {
    id: 5,
    title: "Reading and planning",
    start: "20:00",
    end: "21:30"
  }
];

const toMinutes = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const formatHourLabel = (hour) => {
  const suffix = hour >= 12 ? "PM" : "AM";
  const normalizedHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${normalizedHour} ${suffix}`;
};

const DetailedTimetable = ({ date = "Monday, April 15", tasks = sampleTasks }) => {
  const totalHeight = HOUR_HEIGHT * 24;

  return (
    <div className="min-h-screen bg-white text-black px-6 py-8 jacques-francois-regular">
      <div className="mx-auto max-w-6xl">
        <div className="border-b border-black pb-5">
          <p className="text-sm tracking-[0.3em] uppercase">Detailed Day View</p>
          <h1 className="mt-3 text-4xl">{date}</h1>
        </div>

        <div className="mt-8 grid grid-cols-[84px_1fr] gap-4">
          <div className="relative" style={{ height: `${totalHeight}px` }}>
            {Array.from({ length: 24 }).map((_, hour) => (
              <div
                key={hour}
                className="absolute left-0 w-full text-right text-sm text-black/70"
                style={{ top: `${hour * HOUR_HEIGHT - 10}px` }}
              >
                {formatHourLabel(hour)}
              </div>
            ))}
          </div>

          <div className="relative border border-black bg-white" style={{ height: `${totalHeight}px` }}>
            {Array.from({ length: 24 }).map((_, hour) => (
              <div
                key={hour}
                className="absolute left-0 w-full border-t border-black/20"
                style={{ top: `${hour * HOUR_HEIGHT}px`, height: `${HOUR_HEIGHT}px` }}
              >
                <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-black/10" />
              </div>
            ))}

            {tasks.map((task) => {
              const startMinutes = toMinutes(task.start);
              const endMinutes = toMinutes(task.end);
              const top = startMinutes * MINUTE_HEIGHT;
              const height = Math.max((endMinutes - startMinutes) * MINUTE_HEIGHT, 36);

              return (
                <div
                  key={task.id}
                  className="absolute left-3 right-3 overflow-hidden rounded-none border border-black bg-black text-white"
                  style={{
                    top: `${top}px`,
                    height: `${height}px`
                  }}
                >
                  <div className="flex h-full flex-col justify-between p-3">
                    <div>
                      <p className="text-lg leading-tight">{task.title}</p>
                    </div>
                    <p className="text-xs tracking-[0.2em] uppercase">
                      {task.start} - {task.end}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedTimetable;
