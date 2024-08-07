import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("todos")) || [],
  input: "",
  isEditing: false,
  currentIndex: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setInput: (state, action) => {
      state.input = action.payload;
    },
    addItem: (state) => {
      state.items.push({ text: state.input, completed: false });
      state.input = "";
    },
    updateItem: (state) => {
      if (
        state.currentIndex !== null &&
        state.currentIndex < state.items.length
      ) {
        state.items[state.currentIndex].text = state.input;
        state.input = "";
        state.isEditing = false;
        state.currentIndex = null;
      }
    },
    toggleComplete: (state, action) => {
      const item = state.items[action.payload];
      item.completed = !item.completed;
    },
    editItem: (state, action) => {
      const index = action.payload;
      if (index >= 0 && index < state.items.length) {
        const item = state.items[index];
        if (item.completed) {
          alert("Cannot edit completed items.");
        } else {
          state.input = item.text;
          state.isEditing = true;
          state.currentIndex = index;
        }
      }
    },
    deleteItem: (state, action) => {
      const indexToDelete = action.payload;
      state.items.splice(indexToDelete, 1);

      if (state.currentIndex === indexToDelete) {
        state.input = "";
        state.isEditing = false;
        state.currentIndex = null;
      } else if (state.currentIndex > indexToDelete) {
        state.currentIndex--;
      }
    },
  },
});

export const {
  setInput,
  addItem,
  updateItem,
  toggleComplete,
  editItem,
  deleteItem,
} = todoSlice.actions;

export default todoSlice.reducer;
