import React, { useState } from "react";
import { useHook } from "../hooks/useHook";

export default function EditTask({ task, onClose }) {
  const { editTask } = useHook();

  const [form, setForm] = useState({
    name: task.name,
    description: task.description,
    priority: task.priority,
    dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editTask(task._id, form);
    onClose(); // close modal
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-96">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Edit Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-xl"
            placeholder="Task name"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-xl"
            placeholder="Task description"
          />
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full p-2 border rounded-xl"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className="w-full p-2 border rounded-xl"
          />
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-xl font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-xl font-semibold"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
