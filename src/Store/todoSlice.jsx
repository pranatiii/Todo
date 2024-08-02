import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: JSON.parse(localStorage.getItem('todos')) || [],
  input: '',
  isEditing: false,
  currentIndex: null,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setInput: (state, action) => {
      state.input = action.payload;
    },
    addItem: (state) => {
      state.items.push({ text: state.input, completed: false });
      state.input = '';
    },
    updateItem: (state) => {
      state.items[state.currentIndex].text = state.input;
      state.input = '';
      state.isEditing = false;
      state.currentIndex = null;
    },
    toggleComplete: (state, action) => {
      const item = state.items[action.payload];
      item.completed = !item.completed;
    },
    editItem: (state, action) => {
      state.input = state.items[action.payload].text;
      state.isEditing = true;
      state.currentIndex = action.payload;
    },
    deleteItem: (state, action) => {
      state.items.splice(action.payload, 1);
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

