import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export function useHook() {
  const URL = import.meta.env.VITE_BACKEND_URL;

  const [taskList, setTaskList] = useState([]);
  const [count, setCount] = useState(0);
  const token = localStorage.getItem("token");

  const [filter, setFilter] = useState("All");

  const getTasks = async () => {
    try {
      const res = await axios.get(`${URL}/v1/task/getall`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("📦 Response:", res.data.success);
      if (res.data.success) {
        setTaskList(res.data.taskList || []);
        setCount(res.data.count || 0);
      }
    } catch (error) {
      console.error("No task Available");
      return;
    }
  };
  useEffect(() => {
    if (token) getTasks();
  }, []);

  const addTask = async (newTask) => {
    try {
      const res = await axios.post(`${URL}/v1/task/add`, newTask, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.success) {
        console.log("Task Added SuccessFully");
        toast.success("Task Added Successfully");
        await getTasks();
        return res.data;
      }
    } catch (error) {
      toast.error("Faild to Add Task");
      console.log("Task Add Error", error.message);
    }
  };

  const taskCompleted = async (taskid) => {
    try {
      const res = await axios.put(`${URL}/v1/task/iscompleted/${taskid}`);
      if (res.data.success) {
        toast.success("Reload The Page to See Update");
        await getTasks();
      }
    } catch (error) {
      toast.error("Faild to Update Task");
      console.error("Task Error:", error.message);
    }
  };

  const editTask = async (taskid, task) => {
    try {
      const res = await axios.put(`${URL}/v1/task/edit/${taskid}`, task);
      if (res.data.success) {
        toast.success("Task Updated Successfully");
        await getTasks();
      }
    } catch (error) {
      toast.error("Faild to Update Task");
      console.error(error.message);
    }
  };

  const deleteTask = async (taskid) => {
    try {
      const res = await axios.delete(`${URL}/v1/task/delete/${taskid}`);
      if (res.data.success) {
        toast.success("Task Deleted Successfully");
        await getTasks();
        return res.data;
      }
    } catch (error) {
      toast.error("Task Deletion Failed");
      console.error(error.message);
    }
  };
  const completedTasks = taskList.filter((t) => t.isCompleted);
  const incompletedTasks = taskList.filter((t) => !t.isCompleted);

  // Dynamic filtering
  const filteredTasks =
    filter === "Completed"
      ? completedTasks
      : filter === "Incompleted"
      ? incompletedTasks
      : taskList;

  const stats = {
    total: taskList.length,
    iscompleted: taskList.filter((t) => t.iscompleted).length,
    active: taskList.filter((t) => !t.iscompleted).length,
    highPriority: taskList.filter(
      (t) => t.priority === "high" && !t.iscompleted
    ).length,
  };

  return {
    taskList,
    count,
    filter,
    filteredTasks,
    setFilter,
    completedTasks,
    incompletedTasks,
    stats,
    addTask,
    getTasks,
    taskCompleted,
    editTask,
    deleteTask,
  };
}
