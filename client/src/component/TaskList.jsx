import React, { useState } from "react";
import { useHook } from "../hooks/useHook";
import Taskitem from "./Taskitem";
import { CircleCheckBig } from "lucide-react";

export default function TaskList() {
  const {
    taskList,
    count,
    filteredTasks,
    setFilter,
    filter,
    completedTasks,
    incompletedTasks,
  } = useHook();

  // Counts
  const totalCount = taskList.length;
  const completedCount = completedTasks.length;
  const incompleteCount = incompletedTasks.length;

  if (count === 0) {
    return (
      <div className="flex flex-col w-screen mt-8 p-6 items-center text-slate-600 text-center">
        <div className="flex flex-col items-center bg-gray-200/50 w-full py-20 rounded-4xl shadow-2xl space-y-2">
          <CircleCheckBig size={65} className="m-4 font-bold text-green-700" />
          <h1 className="font-bold text-4xl">No Task Avialable</h1>
          <h3 className="font-semibold text-lg">
            Added Task will Apperar Here!!
          </h3>
        </div>
      </div>
    );
  } else
    return (
      <>
        <div className="mt-4 p-6">
          <div className="p-8 items-center">
            <h2 className="text-4xl mb-6  font-bold text-blue-600">Task </h2>
            <div className="flex flex-wrap gap-3 mt-4">
              <button
                onClick={() => setFilter("All")}
                className={`px-4 py-2 rounded-3xl font-semibold transition-all ${
                  filter === "All"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-blue-600 hover:bg-blue-100"
                }`}
              >
                All <span>({totalCount})</span>
              </button>
              <button
                onClick={() => setFilter("Completed")}
                className={`px-4 py-2 rounded-3xl font-semibold transition-all ${
                  filter === "Completed"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-green-600 hover:bg-green-100"
                }`}
              >
                Completed <span>({completedCount})</span>
              </button>
              <button
                onClick={() => setFilter("Incompleted")}
                className={`px-4 py-2 rounded-3xl font-semibold transition-all ${
                  filter === "Incompleted"
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-200 text-yellow-600 hover:bg-yellow-100"
                }`}
              >
                Incompleted <span>({incompleteCount})</span>
              </button>
            </div>
          </div>
          <div className="mt-4 ">
            {filteredTasks.map((task) => (
              <Taskitem key={task._id} task={task} />
            ))}
          </div>
        </div>
      </>
    );
}
