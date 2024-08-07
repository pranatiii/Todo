import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./todo.css";
import {
  setInput,
  addItem,
  updateItem,
  toggleComplete,
  editItem,
  deleteItem,
} from "../Store/todoSlice";
import Rocket from "../Icons/Rocket";
import Trash from "../Icons/Trash";
import Plus from "../Icons/Plus";
import Edit from "../Icons/Edit";

const Todo = () => {
  const dispatch = useDispatch();
  const { items, input, isEditing } = useSelector((state) => state.todos);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(items));
  }, [items]);

  const handleAdd = () => {
    if (input.trim()) {
      if (isEditing) {
        dispatch(updateItem());
      } else {
        dispatch(addItem());
      }
    } else {
      alert("Please enter a task to create");
    }
  };

  const handleInputChange = (e) => {
    dispatch(setInput(e.target.value));
  };

  const createdTasksCount = items.length;
  const completedTasksCount = items.filter((item) => item.completed).length;

  return (
    <>
      <div className="top-container">
        <header className="header">
          <h1 className="logo">
            <Rocket /> <span className="to">to</span>
            <span className="do">do</span>
          </h1>
        </header>
      </div>
      <div className="search-container">
        <div className="new-task">
          <input
            type="text"
            className="search-bar"
            placeholder="Enter the tasks"
            value={input}
            onChange={handleInputChange}
          />
          <button className="create-btn" onClick={handleAdd}>
            <span>{isEditing ? "Update" : "Create"}</span>
            <Plus />
          </button>
        </div>
      </div>
      <div className="bottom-container">
        <main className="main-content">
          {createdTasksCount > 0 && (
            <div className="tasks-section">
              <div className="task-bar">
                <h2 className="h2-created">
                  Tasks created{" "}
                  <span className="task-count">{createdTasksCount}</span>
                </h2>
                <h2 className="h2-completed">
                  Completed
                  <span className="completed-count">
                    {completedTasksCount} of {createdTasksCount}
                  </span>
                </h2>
              </div>
              <div className="tasks">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className={`task ${item.completed ? "completed" : ""}`}
                  >
                    <input
                      type="checkbox"
                      className="checkbox-round"
                      checked={item.completed}
                      onChange={() => dispatch(toggleComplete(index))}
                    />
                    <p>{item.text}</p>
                    <button
                      className="edit-btn"
                      onClick={() => dispatch(editItem(index))}
                    >
                      <Edit />
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => dispatch(deleteItem(index))}
                    >
                      <Trash />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Todo;
