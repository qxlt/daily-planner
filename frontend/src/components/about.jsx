const About = () => {
    return(
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            <div className="w-1/2 h-2/3 bg-[url('./pics/pink-beige-polka-dot.png')] bg-cover flex
            flex-col items-center rounded-lg">
                <h2 className="jacques-francois-regular mt-10 text-2xl forest-green-font">
                    Confirm Tasks Generated</h2>
                <table className="table-auto border-separate border-spacing-4 w-full">
  <thead>
    <tr className="text-center">
      <th className="w-1/3">Description</th>
      <th className="w-1/6">Start Time</th>
      <th className="w-1/6">End Time</th>
      <th className="w-1/6 text-center">Is Repeated?</th>
    </tr>
  </thead>

  <tbody>
    <tr className=" rounded-xl ">
      
      <td className="p-2 rounded-xl">
        <input
          type="text"
          defaultValue="Morning routine - yoga and horsing"
          className="w-full border-2 border-indigo-200 bg-white rounded-xl p-2 text-center focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
      </td>

      <td className="p-2">
        <input
          type="text"
          defaultValue="09:00"
          className="w-full border-2 border-indigo-200 bg-white rounded-xl p-2 text-center focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
      </td>

      <td className="p-2">
        <input
          type="text"
          defaultValue="10:00"
          className="w-full border-2 border-indigo-200 bg-white rounded-xl p-2 text-center focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
      </td>

      <td className="p-2 text-center">
        <input
          type="checkbox"
          className="w-5 h-5 accent-indigo-300 cursor-pointer"
        />
      </td>

    </tr>
  </tbody>
</table>
            </div>
        </div>
      
    )
}

export default About