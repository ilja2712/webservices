import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TaskService from "../services/taskService";

const initialState = [];

export const createTask = createAsyncThunk(
  "task/create",
  async ({ title, description, date_task, priority, status, uid } ) => {
    const res = await TaskService.create({ title, description, date_task, priority, status, uid } );
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
    const res = await TaskService.updateStatus({ id, status, uid });
    return res.data;
  }
);

export const updateTaskAll = createAsyncThunk(
  "task/updateTaskAll",
  async ({ id, title, description, date_task, priority }) => {
    const res = await TaskService.updateAll({ id, title, description, date_task, priority });
    return res.data;
  }
);

export const deleteTask = createAsyncThunk(
  "task/delete",
  async (id) => {
    await TaskService.remove(id);
    return { id };
  }
);

export const deleteTaskWithState = createAsyncThunk(
  "task/deleteState",
  async (id) => {
    await TaskService.removeWS(id);
    return { id };
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
      const index = state.findIndex(task => task['ID_TASK'] === action.payload['ID_TASK']);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [updateTaskAll.fulfilled]: (state, action) => {
      const index = state.findIndex(task => task['ID_TASK'] === action.payload['ID_TASK']);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteTask.fulfilled]: (state, action) => {
      const index = state.findIndex(task => task['ID_TASK'] === action.payload['ID_TASK']);
      state.splice(index, 1);
    },
    [deleteTaskWithState.fulfilled]: (state, action) => {
      const index = state.findIndex(task => task['ID_TASK'] === action.payload['ID_TASK']);
      state.splice(index, 1);
    },
    /*
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