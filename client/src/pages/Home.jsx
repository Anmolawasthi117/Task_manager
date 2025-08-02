import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  addTask,
  toggleTask,
  deleteTask,
} from "../store/slices/taskSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { tasks = [], loading, error } = useSelector((state) => state.tasks || {});
  const [title, setTitle] = useState("");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addTask({ title }));
      setTitle("");
    }
  };

  const handleToggle = (id) => dispatch(toggleTask(id));
  const handleDelete = (id) => dispatch(deleteTask(id));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-gray-800 text-2xl font-semibold text-center mb-6">
          Task Manager
        </h1>

        <form onSubmit={handleAddTask} className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Add a task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 px-4 py-2 rounded-md text-sm focus:outline-none border border-gray-300 focus:ring-2 focus:ring-blue-500 bg-white"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md font-medium transition-all"
          >
            Add
          </button>
        </form>

        {loading && <p className="text-sm text-center text-gray-500">Loading...</p>}
        {error && <p className="text-sm text-center text-red-500">{error}</p>}

        <div className="space-y-3 max-h-80 overflow-y-auto">
          {Array.isArray(tasks) && tasks.length > 0 ? (
            tasks.map((task) => (
              <div
                key={task._id}
                className={`flex justify-between items-center px-4 py-2 rounded-md border ${
                  task.completed
                    ? "bg-gray-100 border-gray-300"
                    : "bg-white border-gray-200"
                } shadow-sm`}
              >
                <span
                  className={`text-sm font-medium ${
                    task.completed ? "line-through text-gray-500" : "text-gray-800"
                  }`}
                >
                  {task.title}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggle(task._id)}
                    className={`text-xs px-3 py-1 rounded-md font-medium transition-all ${
                      task.completed
                        ? "bg-gray-300 hover:bg-gray-400 text-gray-800"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                  >
                    {task.completed ? "Undo" : "Done"}
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="text-xs px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-center text-gray-500">No tasks added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
