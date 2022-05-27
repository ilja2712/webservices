import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './slices/tasks';
import stateReducer from './slices/states';

const reducer = {
  tasks: taskReducer,
  states: stateReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;