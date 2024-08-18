import { useReducer, useState } from "react";
import hero from "./assets/hero.svg";

interface Task {
  id: string;
  description: string | undefined;
  completed: boolean;
}

interface State {
  tasks: Task[];
  error: string | null;
}

interface Action {
  type: "addTask" | "removeTask" | "resetTask" | "toggleTaskCompletion";
  payload?: string;
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "addTask": {
      if (action.payload?.trim() === "") {
        return { ...state, error: "Task cannot be empty" };
      }
      const newTask: Task = {
        id: Date.now().toString(),
        description: action.payload,
        completed: false,
      };
      return { ...state, tasks: [...state.tasks, newTask], error: null };
    }
    case "removeTask": {
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
        error: null,
      };
    }
    case "resetTask": {
      return { ...state, tasks: [], error: null };
    }
    case "toggleTaskCompletion": {
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
        error: null,
      };
    }
    default:
      return state;
  }
}

// Main component
function TaskManagerTable() {
  const [state, dispatch] = useReducer(reducer, {
    tasks: [],
    error: null,
  });
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [taskAddedAlert, setTaskAddedAlert] = useState(false);

  const handleAddTask = () => {
    const input = (document.getElementById("taskInput") as HTMLInputElement)
      .value;
    if (input.trim() === "") {
      dispatch({ type: "addTask", payload: "" });
      return;
    }
    dispatch({ type: "addTask", payload: input });
    setTaskAddedAlert(true);
    setTimeout(() => setTaskAddedAlert(false), 3000); // Hide alert after 3 seconds
  };

  const handleResetTasks = () => {
    setShowConfirmReset(true);
  };

  const confirmReset = () => {
    dispatch({ type: "resetTask" });
    setShowConfirmReset(false);
  };

  const cancelReset = () => {
    setShowConfirmReset(false);
  };

  return (
    // container mx-auto px-6 space-x-6 flex flex-col-reverse md:flex-row
    <div className="container mx-auto flex flex-col-reverse space-x-6 pt-10   max-w-screen-xl md:flex-row">

          <div className="md:w-1/2 flex flex-col justify-center space-y-5 py-8 text-center md:text-left text-slate-100">
          <h3 className="text-white text-xl font-bold sm:text-2xl">
            Task Manager
          </h3>
          <p className="text-white mt-2">
            Add and manage your tasks effectively in a table format.
          </p>
          <div className="mt-4 container mx-auto p-5">
            <input
              type="text"
              id="taskInput"
              placeholder="Enter a task"
              className="text-white border p-2 rounded w-full"
            />
            {state.error && (
              <div className="text-red-500 mt-2 p-2 border border-red-400 rounded bg-red-100">
                {state.error}
              </div>
            )}
            {taskAddedAlert && (
              <div className="text-green-500 mt-2 p-2 border border-green-400 rounded bg-green-100">
                Task added successfully!
              </div>
            )}
            <div className="flex flex-col space-y-6">
              <button
                onClick={handleAddTask}
                style={{ backgroundColor: "#C2F915", color: "#03003A" }}
                className="mt-5 block py-3 px-4 font-medium text-center active:shadow-none shadow md:inline font-custom"
              >
                <i className="ri-play-list-add-line" /> <b>Add Task</b>
              </button>
              <button
                onClick={handleResetTasks}
                style={{ backgroundColor: "#03003A" }}
                className="block py-3 px-4 font-medium text-center text-white bg-red-600 hover:bg-red-500 active:bg-red-700 active:shadow-none shadow md:inline font-custom"
              >
                <i className="ri-loop-left-fill" /> Reset Tasks
              </button>
            </div>

            <div className="mt-20 shadow-sm border rounded-lg overflow-x-hidden mb-5">
              <table className="w-full table-auto text-sm text-left">
                <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                  <tr>
                    <th className="py-3 px-6">Task Description</th>
                    <th className="py-3 px-6">Status</th>
                    <th className="py-3 px-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-white divide-y">
                  {state.tasks.length > 0 ? (
                    state.tasks.map((task) => (
                      <tr key={task.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {task.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-2 rounded-full font-semibold text-xs ${
                              task.completed
                                ? "text-green-600 bg-green-50"
                                : "text-blue-600 bg-blue-50"
                            }`}
                          >
                            {task.completed ? "Completed" : "Incomplete"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() =>
                              dispatch({
                                type: "toggleTaskCompletion",
                                payload: task.id,
                              })
                            }
                            style={{
                              backgroundColor: "#C2F915",
                              color: "#03003A",
                            }}
                            className="bg-green-600 text-white py-1 px-2 rounded mr-2"
                          >
                            {task.completed ? (
                              <i className="ri-checkbox-line"></i> // Checked
                            ) : (
                              <i className="ri-checkbox-blank-line"></i> // Unchecked
                            )}
                          </button>
                          <button
                            onClick={() =>
                              dispatch({ type: "removeTask", payload: task.id })
                            }
                            className="bg-red-600 text-white py-1 px-2 rounded"
                          >
                            <i className="ri-delete-bin-6-fill" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        className="text-white px-6 py-4 whitespace-nowrap"
                        colSpan={3}
                        style={{ textAlign: "center" }}
                      >
                        No tasks available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Confirmation Modal */}
            {showConfirmReset && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                <div className="bg-white p-6 rounded-lg shadow-lg sm:w-1/3">
                  <h3 className="text-slate-950 font-bold mb-4">
                    Confirm Reset
                  </h3>
                  <p className="text-slate-950 mb-4">
                    Are you sure you want to reset all tasks?
                  </p>
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={confirmReset}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
                    >
                      Yes, Reset
                    </button>
                    <button
                      onClick={cancelReset}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Flex container for image */}
        <div  className="max-2xl:hidden md:w-1/2">
          <img src={hero} alt="Hero" className='size-4/5 mt-12 mx-32 ' />
        </div>
      </div>
  );
}

export default TaskManagerTable;
