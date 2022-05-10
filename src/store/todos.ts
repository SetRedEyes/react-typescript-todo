import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITodo } from '../interfaces'
import { getLocalStorageTodos } from '../localStorage.service'
import { checkErrorMessageType } from '../utils/checkErrorMessageType'
import { AppDispatch, RootState } from './createStore'

interface TodoState {
  entities: ITodo[]
  isLoading: boolean
  error: string | null
}

const initialState: TodoState = {
  entities: getLocalStorageTodos(),
  isLoading: true,
  error: null
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todosRequested: (state) => {
      state.isLoading = true
    },
    todosRecieved: (state, action: PayloadAction<ITodo[]>) => {
      state.entities = action.payload
      state.isLoading = false
    },
    todosRequestFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },
    todoAdded: (state, action: PayloadAction<ITodo>) => {
      state.entities.push(action.payload)
    },
    todoRemoved: (state, action: PayloadAction<number>) => {
      state.entities = state.entities.filter(
        (todo) => todo.id !== action.payload
      )
    },
    todoToggled: (state, action) => {
      state.entities = state.entities.map((todo) => {
        if (todo.id === action.payload) {
          todo.completed = !todo.completed
        }
        return todo
      })
    }
  }
})

const { reducer: todosReducer, actions } = todosSlice

export const {
  todosRequested,
  todosRecieved,
  todosRequestFailed,
  todoAdded,
  todoRemoved,
  todoToggled
} = actions

const addTodoRequested = createAction('todos/addTodoRequested')
const removeTodoRequested = createAction('todos/removeTodoRequested')

export const loadTodosList = () => async (dispatch: AppDispatch) => {
  dispatch(todosRequested())

  try {
    const todos = await getLocalStorageTodos()
    dispatch(todosRecieved(todos))
  } catch (e) {
    todosRequestFailed(checkErrorMessageType(e))
  }
}

export const addTodo = (payload: ITodo) => async (dispatch: AppDispatch) => {
  dispatch(addTodoRequested())

  try {
    const todos = await getLocalStorageTodos()

    todos.push(payload)
    localStorage.setItem('todos', JSON.stringify(todos))
    await dispatch(todoAdded(todos))
  } catch (e) {
    todosRequestFailed(checkErrorMessageType(e))
  }
}

export const removeTodo = (todoId:number) => async (dispatch: AppDispatch) => {
  dispatch(removeTodoRequested())

  try {
    const todos = await getLocalStorageTodos()
    const updatedTodos = await todos.filter((todo:ITodo) => todo.id !== todoId)
    localStorage.setItem('todos', JSON.stringify(updatedTodos))
    dispatch(todoRemoved(todoId))
  } catch (e) {
    todosRequestFailed(checkErrorMessageType(e))
  }
}

export const todoToggle = (todoId:number) => async (dispatch: AppDispatch) => {
  try {
    const todos = await getLocalStorageTodos()
    const updatedTodos = await todos.map((todo:ITodo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          completed: !todo.completed
        }
      }
      return todo
    })

    localStorage.setItem('todos', JSON.stringify(updatedTodos))
    dispatch(todoToggled(todoId))
  } catch (e) {
    todosRequestFailed(checkErrorMessageType(e))
  }
}

export const getTodosList = () => (state: RootState) => {
  if (state.todos.entities) {
    return state.todos.entities
  }
}

export default todosReducer
