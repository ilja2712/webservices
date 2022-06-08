import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PriorityService from "../services/priorityService";

const initialState = [];

/*
export const createTask = createAsyncThunk(
  "task/create",
  async ({ head, description, date_task, priority, status }, uid) => {
    const res = await TaskService.create({ head, description, date_task, priority, status }, uid);
    return res.data;
  }
);
*/

export const findPriorityByUserID = createAsyncThunk(
  "priority/findByUID",
  async (uid) => {
    const res = await PriorityService.get(uid);
    return res.data;
  }
);

/*
export const updateStateName = createAsyncThunk(
  "state/updateStateName",
  async ({ id, name, uid }) => {
    const res = await PriorityService.updateStateName(id, { name, uid });
    return res.data;
  }
);*/

const prioritySlice = createSlice({
  name: "priority",
  initialState,
  extraReducers: {
   /*[createState.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrieveTutorials.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updateStateName.fulfilled]: (state, action) => {
      //const index = state.findIndex(stat => stat.id === action.payload['ID_STATE']);
      state[action.payload['ID_STATE']] = {
        ...state[action.payload['ID_STATE']],
        ...action.payload,
      };
      console.log(state[action.payload['ID_STATE']])
    },
    [deleteTutorial.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
    [deleteAllTutorials.fulfilled]: (state, action) => {
      return [];
    },*/
    [findPriorityByUserID.fulfilled]: (state, action) => {
      state = action.payload;
      return [...action.payload];
    },
  },
});

export const selectAllPriority = (state) => state.priority;

const { reducer } = prioritySlice;
export default reducer;