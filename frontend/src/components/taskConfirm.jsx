const TaskConfirm = ({ tasks = [], title = "Confirm Tasks Generated", fullScreen = true }) => {
  const hasTasks = tasks.length > 0;

  return (
    <div className={`${fullScreen ? "w-screen h-screen" : "w-full"} flex flex-col items-center justify-center`}>
      <div
        className="w-11/12 max-w-5xl min-h-[28rem] bg-[url('./pics/pink-beige-polka-dot.png')] bg-cover
        flex flex-col items-center rounded-lg shadow-lg px-6 py-8"
      >
        <h2 className="jacques-francois-regular mt-2 text-2xl forest-green-font text-center">
          {title}
        </h2>

        {hasTasks ? (
          <div className="mt-8 w-full overflow-x-auto">
            <table className="table-auto border-separate border-spacing-y-4 w-full">
              <thead>
                <tr className="text-center forest-green-font jacques-francois-regular text-lg">
                  <th className="w-5/12">Description</th>
                  <th className="w-2/12">Start Time</th>
                  <th className="w-2/12">End Time</th>
                  <th className="w-2/12">Is Repeated?</th>
                </tr>
              </thead>

              <tbody>
                {tasks.map((task, index) => (
                  <tr key={`${task.name || task.description || "task"}-${index}`} className="text-center align-middle">
                    <td className="p-2">
                      <input
                        type="text"
                        defaultValue={task.name || task.description || ""}
                        className="w-full border-2 border-indigo-200 bg-white/90 rounded-xl p-2 text-center focus:outline-none"
                      />
                    </td>

                    <td className="p-2">
                      <input
                        type="text"
                        defaultValue={task.start_time || ""}
                        className="w-full border-2 border-indigo-200 bg-white/90 rounded-xl p-2 text-center focus:outline-none"
                      />
                    </td>

                    <td className="p-2">
                      <input
                        type="text"
                        defaultValue={task.end_time || ""}

                        className="w-full border-2 border-indigo-200 bg-white/90 rounded-xl p-2 text-center focus:outline-none"
                      />
                    </td>

                    <td className="p-2 text-center">
                      <input
                        type="checkbox"
                        defaultChecked={Boolean(task.is_repeated)}
                        className="w-5 h-5 accent-indigo-300 cursor-default"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <p className="jacques-francois-regular text-lg forest-green-font text-center">
              Generated tasks will show up here once you create them.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskConfirm;
