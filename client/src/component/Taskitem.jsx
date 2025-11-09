import React, { useState } from "react";
import { CircleCheck, Pencil, Trash2 } from "lucide-react";
import { useHook } from "../hooks/useHook";
import EditTask from "./EditTask";

export default function Taskitem({ task }) {
  const { taskCompleted, deleteTask } = useHook();

  const [isEditing, setIsEditing] = useState(false);
  const priorityColors = {
    high: "text-red-500 bg-red-100",
    medium: "text-yellow-500 bg-yellow-100",
    low: "text-green-500 bg-green-100",
  };

  const formattedDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString()
    : "No Due Date";

  return (
    <>
      <div
        key={task._id}
        className={`p-8 bg-gray-100 rounded-3xl mb-4 shadow-md ${
          task.isCompleted ? "bg-gray-300" : ""
        }`}
      >
        <div className=" flex justify-between items-center ">
          <div className=" flex gap-6 ">
            <button
              onClick={() => taskCompleted(task._id)}
              className="mt-1 hover:scale-110 transition-transform"
              title={
                task.isCompleted ? "Mark as incomplete" : "Mark as completed"
              }
            >
              <CircleCheck
                className={` ${
                  task.isCompleted ? "text-green-400" : "text-slate-400"
                }`}
              />
            </button>
            <div className="space-y-1">
              <h1
                className={`text-3xl font-bold  text-slate-900 ${
                  task.isCompleted ? "line-through text-gray-400" : ""
                }`}
              >
                {task.name}
              </h1>
              <h2
                className={`text-lg font-semibold text-slate-700 ${
                  task.isCompleted ? "line-through text-gray-300" : ""
                }`}
              >
                {task.description}
              </h2>
              <div className="mt-4 ml-4">
                <span className="text-sm font-medium">{formattedDate}</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    priorityColors[task.priority.toLowerCase()] || ""
                  }`}
                >
                  {task.priority}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-6">
            <button onClick={() => setIsEditing(true)}>
              <Pencil />
            </button>
            <button onClick={() => deleteTask(task._id)}>
              <Trash2 />
            </button>
          </div>
        </div>
        {isEditing && (
          <EditTask task={task} onClose={() => setIsEditing(false)} />
        )}
      </div>
    </>
  );
}
