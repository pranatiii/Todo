import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setInput, addItem, updateItem, toggleComplete, editItem, deleteItem } from "../Store/todoSlice";
import "./todo.css";

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
    }
  };

  const handleInputChange = (e) => {
    dispatch(setInput(e.target.value));
  };

  return (
    <div className="container">
      <h1>Todo</h1>
      <div>
        <input
          type="text"
          className="search-bar"
          placeholder="Enter item"
          value={input}
          onChange={handleInputChange}
        />
        <button className="add-button" onClick={handleAdd}>
          {isEditing ? "Update" : "Add"}
        </button>
      </div>
      <ul className="todo-list">
        {items.map((item, index) => (
          <li key={index} className={item.completed ? "completed" : ""}>
            <div className="todo-item">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => dispatch(toggleComplete(index))}
              />
              <span>{item.text}</span>
            </div>
            {!item.completed && (
              <div className="buttons">
                <button className="edit-button" onClick={() => dispatch(editItem(index))}>
                  Edit
                </button>
                <button className="delete-button" onClick={() => dispatch(deleteItem(index))}>
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;



