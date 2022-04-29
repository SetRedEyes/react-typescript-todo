import { combineReducers, configureStore } from '@reduxjs/toolkit'
import todosReducer from './todos'

const rootReducer = combineReducers({todos:todosReducer})

export const store = configureStore({ reducer: rootReducer })
