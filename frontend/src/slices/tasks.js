import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TaskService from "../services/taskService";

const initialState = [];

export const createTask = createAsyncThunk(
  "task/create",
  async ({ head, description, date_task, priority, status }, uid) => {
    const res = await TaskService.create({ head, description, date_task, priority, status }, uid);
    return res.data;
  }
);

export const findTaskByUserID = createAsyncThunk(
  "tutorials/findByUID",
  async (uid) => {
    const res = await TaskService.get(uid);
    return res.data;
  }
);

export const updateTaskStatus = createAsyncThunk(
  "tutorials/updateTaskStatus",
  async ({ id, status, uid }) => {
    const res = await TaskService.updateStatus({ id, status, uid });
    return res.data;
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState,
  extraReducers: {
    [createTask.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    /*[retrieveTutorials.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updateTutorial.fulfilled]: (state, action) => {
      const index = state.findIndex(tutorial => tutorial.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteTutorial.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
    [deleteAllTutorials.fulfilled]: (state, action) => {
      return [];
    },*/
    [findTaskByUserID.fulfilled]: (state, action) => {
      return [...action.payload];
    },
  },
});

const { reducer } = taskSlice;
export default reducer;