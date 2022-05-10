import  { useEffect } from 'react'
import { TodoForm } from '../components/TodoForm'
import { TodoList } from '../components/TodoList'
import { ITodo } from '../interfaces'
import { useAppDispatch, useAppSelector } from '../store/createStore'
import {
  addTodo,
  getTodosList,
  loadTodosList,
  removeTodo,
  todoToggle
} from '../store/todos'



declare var confirm: (question: string) => boolean

export const TodosPage = () => {
  const dispatch = useAppDispatch()
  const todos = useAppSelector(getTodosList())

  useEffect(() => {
    dispatch(loadTodosList())
  }, [dispatch, todos?.length])

  const addHandler = (title: string) => {
    const newTodo: ITodo = {
      title,
      id: Date.now(),
      completed: false
    }

    dispatch(addTodo(newTodo))
  }

  const toggleHandler = (id: number) => {
    dispatch(todoToggle(id))
  }

  const removeHandler = (id: number) => {
    const shouldRemove = confirm('Are you sure you want to remove to-do?')

    if (shouldRemove) {
      dispatch(removeTodo(id))
    }
  }

  return (
    <>
      <TodoForm onAdd={addHandler} />
      <TodoList
        todos={todos}
        onToggle={toggleHandler}
        onRemove={removeHandler}
      />
    </>
  )
}
