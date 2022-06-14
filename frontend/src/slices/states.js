import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import StateService from "../services/stateService";

const initialState = [];


export const createState = createAsyncThunk(
  "state/create",
  async ({ name, uid }) => {
    const res = await StateService.create({ name, uid });
    return res.data;
  }
);

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

export const deleteState = createAsyncThunk(
  "state/delete",
  async (id) => {
    await StateService.remove(id);
    return id;
  }
);

const stateSlice = createSlice({
  name: "state",
  initialState,
  extraReducers: {
    [createState.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    /*
    [retrieveTutorials.fulfilled]: (state, action) => {
      return [...action.payload];
    },*/
    [updateStateName.fulfilled]: (state, action) => {
      //const index = state.findIndex(stat => stat.id === action.payload['ID_STATE']);
      state[action.payload['ID_STATE']] = {
        ...state[action.payload['ID_STATE']],
        ...action.payload,
      };
    },
    [deleteState.fulfilled]: (state, action) => {
      const index = state.findIndex(( st ) => st['ID_STATE'] === action.payload);
      state.splice(index, 1);
    },
    /*[deleteAllTutorials.fulfilled]: (state, action) => {
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