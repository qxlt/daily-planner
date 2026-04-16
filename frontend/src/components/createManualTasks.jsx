import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { buildProtectedPath, clearAuthSession, getAuthToken } from "../lib/auth.js";

const formatDateForApi = (dateValue) => {
  if (!dateValue) {
    return "";
  }

  return new Date(`${dateValue}T00:00:00`).toISOString();
};

const toMinutes = (timeValue) => {
  const [hours, minutes] = timeValue.split(":").map(Number);
  return hours * 60 + minutes;
};

const toTimeString = (totalMinutes) => {
  const normalizedMinutes = ((totalMinutes % (24 * 60)) + (24 * 60)) % (24 * 60);
  const hours = String(Math.floor(normalizedMinutes / 60)).padStart(2, "0");
  const minutes = String(normalizedMinutes % 60).padStart(2, "0");
  return `${hours}:${minutes}`;
};

const CreateManualTasks = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    repeated: false,
    length: "",
    start_time: "",
    end_time: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.date || !formData.description.trim()) {
      setFeedbackMessage("Please add both a date and description.");
      return;
    }

    let endTime = formData.end_time;

    if (!endTime && formData.start_time && formData.length) {
      endTime = toTimeString(toMinutes(formData.start_time) + Number(formData.length));
    }

    if (formData.start_time && endTime && toMinutes(formData.start_time) >= toMinutes(endTime)) {
      setFeedbackMessage("End time must be later than start time.");
      return;
    }

    setIsSubmitting(true);
    setFeedbackMessage("");

    try {
      const res = await fetch("http://localhost:3001/add-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify({
          description: formData.description.trim(),
          date_assigned: formatDateForApi(formData.date),
          repeated: formData.repeated,
          start_time: formData.start_time || null,
          end_time: endTime || null
        })
      });

      const data = await res.json();

      if (res.status === 401) {
        clearAuthSession();
        alert("Your session expired. Please sign in again.");
        navigate("/signin");
        return;
      }

      if (!res.ok) {
        throw new Error(data.error || "Unable to create task.");
      }

      setFeedbackMessage("Task created successfully.");
      alert(data.message || "Task created successfully.");
      setFormData({
        date: "",
        description: "",
        repeated: false,
        length: "",
        start_time: "",
        end_time: ""
      });
    } catch (error) {
      setFeedbackMessage(error.message || "Something went wrong while creating the task.");
      alert(error.message || "Something went wrong while creating the task.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[url('./pics/colorful-star.jpg')] bg-contain px-6 py-10">
      <div className="mx-auto max-w-2xl rounded-3xl bg-[url('./pics/pink-beige-polka-dot.png')] bg-contain p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="bg-white jacques-francois-regular text-sm uppercase p-2 rounded-xl
             tracking-[0.25em] text-gray-600">
              Manual Task Entry
            </p>
            <h1 className="bg-white jacques-francois-regular text-4xl text-gray-700 mt-2 p-2 rounded-xl">
              Create a task by hand
            </h1>
          </div>
          <Link
            to={buildProtectedPath("/addtask")}
            className="jacques-francois-regular rounded-full bg-white/85 px-4 py-2 text-gray-600
             shadow-sm hover:shadow-md"
          >
            Back
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 md:col-span-1">
            <span className="jacques-francois-regular text-xl text-gray-600">Date</span>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="rounded-2xl bg-white/90 px-4 py-3 jacques-francois-regular text-gray-600
               focus:outline-none focus:ring-2 focus:ring-indigo-300"
              required
            />
          </label>

          <label className="flex flex-col gap-2 md:col-span-1">
            <span className="jacques-francois-regular text-xl text-gray-600">Repeated</span>
            <div className="flex h-full items-center rounded-2xl bg-white/90 px-4 py-3">
              <input
                type="checkbox"
                name="repeated"
                checked={formData.repeated}
                onChange={handleChange}
                className="h-5 w-5 accent-indigo-300 text-gray-600"
              />
              <span className="ml-3 jacques-francois-regular text-gray-600">
                Repeat this task
              </span>
            </div>
          </label>

          <label className="flex flex-col gap-2 md:col-span-2">
            <span className="jacques-francois-regular text-xl text-gray-600">Description</span>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="resize-none rounded-2xl bg-white/90 px-4 py-3 jacques-francois-regular text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              placeholder="Describe the task you want to add"
              required
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="jacques-francois-regular text-xl text-gray-600">Length (minutes)</span>
            <input
              type="number"
              min="0"
              step="5"
              name="length"
              value={formData.length}
              onChange={handleChange}
              className="rounded-2xl bg-white/90 px-4 py-3 jacques-francois-regular text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              placeholder="e.g. 90"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="jacques-francois-regular text-xl text-gray-600">Start Time</span>
            <input
              type="time"
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
              className="rounded-2xl bg-white/90 px-4 py-3 jacques-francois-regular text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </label>

          <label className="flex flex-col gap-2 md:col-span-2">
            <span className="jacques-francois-regular text-xl text-gray-600">End Time</span>
            <input
              type="time"
              name="end_time"
              value={formData.end_time}
              onChange={handleChange}
              className="rounded-2xl bg-white/90 px-4 py-3 jacques-francois-regular text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </label>

          <div className="md:col-span-2 flex flex-col items-start gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="jacques-francois-regular rounded-2xl px-5 py-2 text-lg forest-green-font button-beige-bg hover:scale-105 hover:transition hover:duration-300 disabled:opacity-60"
            >
              {isSubmitting ? "Saving..." : "Create Task"}
            </button>

            {feedbackMessage && (
              <p className="jacques-francois-regular text-lg text-gray-700">{feedbackMessage}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateManualTasks;
