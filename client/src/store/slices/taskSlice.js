// src/store/slices/taskSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosInstance";

// ========== THUNKS ==========
// Fetch tasks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (_, thunkAPI) => {
  try {
    const res = await axios.get("/tasks");
    return res.data.data;
  } catch (err) {
    return thunkAPI.rejectWithValue("Failed to fetch tasks");
  }
});

// Add task
export const addTask = createAsyncThunk("tasks/addTask", async (taskData, thunkAPI) => {
  try {
    const res = await axios.post("/tasks", taskData);
    return res.data.data;
  } catch (err) {
    return thunkAPI.rejectWithValue("Failed to add task");
  }
});

// Toggle completion
export const toggleTask = createAsyncThunk("tasks/toggleTask", async (id, thunkAPI) => {
  try {
    const res = await axios.put(`/tasks/${id}`);
    return res.data.data;
  } catch (err) {
    return thunkAPI.rejectWithValue("Failed to toggle task");
  }
});

// Delete task
export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id, thunkAPI) => {
  try {
    await axios.delete(`/tasks/${id}`);
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue("Failed to delete task");
  }
});

// ========== SLICE ==========
const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    resetTaskState: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })

      // Toggle
      .addCase(toggleTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((t) => t._id === action.payload._id);
        if (index !== -1) state.tasks[index] = action.payload;
      })

      // Delete
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t._id !== action.payload);
      });
  },
});

export const { resetTaskState } = taskSlice.actions;
export default taskSlice.reducer;
