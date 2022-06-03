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
  "task/findByUID",
  async (uid) => {
    const res = await TaskService.get(uid);
    return res.data;
  }
);

export const updateTaskStatus = createAsyncThunk(
  "task/updateTaskStatus",
  async ({ id, status, uid }) => {
    console.log(id, status, uid);
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
    },*/
    [updateTaskStatus.fulfilled]: (state, action) => {
      const index = state.findIndex(task => task.id === action.payload['ID_TASK']);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    /*
    [deleteTutorial.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
    [deleteAllTutorials.fulfilled]: (state, action) => {
      return [];
    },*/
    [findTaskByUserID.fulfilled]: (state, action) => {
      state = action.payload;
      return [...action.payload];
    },
  },
});

export const selectAllTask = (state) => state.tasks;

const { reducer } = taskSlice;
export default reducer;