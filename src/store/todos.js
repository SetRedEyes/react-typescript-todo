import { createSlice } from '@reduxjs/toolkit'

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    entities: JSON.parse(localStorage.getItem('todos') || '[]'),
    isLoading: true,
    error: null
  },
  reducers: {
    todosRequested: (state) => {
      state.isLoading = true
    },
    todosRecieved: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    },
    todosRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    }
  }
})

const { reducer: todosReducer, actions } = todosSlice

export const { todosRequested, todosRecieved, todosRequestFailed } = actions

export const loadTodosList = () => async (dispatch) => {
  dispatch(todosRequested())

  try {
    const todos = await JSON.parse(localStorage.getItem('todos'))
    dispatch(todosRecieved(todos))
  } catch (e) {
    todosRequestFailed(e.message)
  }
}

export default todosReducer
