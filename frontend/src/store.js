import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './slices/tasks';
import stateReducer from './slices/states';
import priorityReducer from './slices/priority';

const reducer = {
  tasks: taskReducer,
  states: stateReducer,
  priority: priorityReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;