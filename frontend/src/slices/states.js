import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import StateService from "../services/stateService";

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

export const findStateByUserID = createAsyncThunk(
  "state/findByUID",
  async (uid) => {
    const res = await StateService.get(uid);
    return res.data;
  }
);

export const updateStateName = createAsyncThunk(
  "state/updateStateName",
  async ({ id, name, uid }) => {
    const res = await StateService.updateStateName(id, { name, uid });
    return res.data;
  }
);

const stateSlice = createSlice({
  name: "state",
  initialState,
  extraReducers: {
   /*[createState.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrieveTutorials.fulfilled]: (state, action) => {
      return [...action.payload];
    },*/
    [updateStateName.fulfilled]: (state, action) => {
      //const index = state.findIndex(stat => stat.id === action.payload['ID_STATE']);
      state[action.payload['ID_STATE']] = {
        ...state[action.payload['ID_STATE']],
        ...action.payload,
      };
      console.log(state[action.payload['ID_STATE']])
    },
    /*[deleteTutorial.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
    [deleteAllTutorials.fulfilled]: (state, action) => {
      return [];
    },*/
    [findStateByUserID.fulfilled]: (state, action) => {
      state = action.payload;
      return [...action.payload];
    },
  },
});

export const selectAllStates = (state) => state.states;

const { reducer } = stateSlice;
export default reducer;