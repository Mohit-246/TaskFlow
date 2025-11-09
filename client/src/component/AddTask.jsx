import React, { useState } from "react";
import { useHook } from "../hooks/useHook";

export default function AddTask() {
  const { addTask } = useHook();
  const [isShowfull, setIsShowfull] = useState(false);
  const priorityColors = {
    high: "text-red-500 bg-red-100",
    medium: "text-yellow-500 bg-yellow-100",
    low: "text-green-500 bg-green-100",
  };

  const [task, setTask] = useState({
    name: "",
    description: "",
    priority: "",
    dueDate: "",
    isCompleted: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!task.name.trim() || !task.description.trim()) {
      alert("Please enter both a name and description");
      return;
    }
    addTask(task);
    setTask({
      name: "",
      description: "",
      priority: "",
      dueDate: "",
      isCompleted: false,
    });
    setIsShowfull(false);
  };

  return (
    <div className="px-6 py-8 m-4 shadow-md rounded-4xl bg-sky-50">
      <h2 className="p-2 text-3xl font1 font-semibold text-blue-600 text-shadow-2xs">
        AddTask
      </h2>
      <form onSubmit={handleAddTask} className="mt-4 ">
        <input
          placeholder="Task Title"
          type="text"
          name="name"
          id=""
          value={task.name}
          onChange={handleChange}
          className="bg-gray-200 w-full py-4 px-2 text-lg font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onFocus={(e) => setIsShowfull(true)}
        />
        {isShowfull && (
          <div className="mt-4 space-y-4">
            <textarea
              placeholder="Description"
              rows={3}
              name="description"
              value={task.description}
              onChange={handleChange}
              className="bg-gray-200 w-full py-4 px-2 text-lg font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            ></textarea>
            <div className="px-4 flex gap-4">
              <input
                type="date"
                name="dueDate"
                id=""
                value={task.dueDate}
                onChange={handleChange}
                className="py-2 px-4 bg-gray-300/40 rounded-lg font-semibold text-gray-500"
              />
              <select
                name="priority"
                onChange={handleChange}
                className={`py-2 px-4 bg-gray-300/40 rounded-lg font-semibold text-gray-500 ${
                  priorityColors[task.priority.toLowerCase()] || ""
                }`}
              >
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="mt-2 px-6 flex gap-4 justify-end">
              <button
                type="submit"
                className="px-2 py-1 bg-blue-400 text-white text-lg font-semibold rounded-lg"
              >
                Add Task
              </button>
              <button
                type="reset"
                onClick={(e) => setIsShowfull(false)}
                className="px-2 py-1 text-blue-400 bg-white text-lg font-semibold rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
