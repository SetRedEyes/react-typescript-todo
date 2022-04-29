import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { TodoForm } from '../components/TodoForm'
import { TodoList } from '../components/TodoList'
import { ITodo } from '../interfaces'

declare var confirm: (question: string) => boolean

export const TodosPage: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>(() =>
    JSON.parse(localStorage.getItem('todos') || '[]')
  )


  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addHandler = (title: string) => {
    const newTodo: ITodo = {
      title,
      id: Date.now(),
      completed: false
    }

    setTodos((prevState) => [newTodo, ...prevState])
  }

  const toggleHandler = (id: number) => {
    setTodos((prevState) =>
      prevState.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed
          }
        }
        return todo
      })
    )
  }

  const removeHandler = (id: number) => {
    const shouldRemove = confirm(
      'Are you sure you want to remove to-do?'
    )

    if (shouldRemove) {
      setTodos((prevState) =>
        prevState.filter((todo) => todo.id !== id)
      )
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
