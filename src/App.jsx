import { useEffect, useState } from 'react'
import './App.css'

// const API_BASE = 'http://65.2.127.141:8000/api/todos'
// const API_BASE = 'http://todoapp.ap-south-1.elasticbeanstalk.com/api/todos'
// const API_BASE = 'http://localhost:5000/api/todos'
const API_BASE = '/api/todos'


function App() {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')

  const fetchTodos = async () => {
    try {
      const res = await fetch(API_BASE)
      const data = await res.json()
      setTodos(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const addTodo = async (e) => {
    e.preventDefault()
    if (!text.trim()) return
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      })
      const todo = await res.json()
      setTodos((t) => [todo, ...t])
      setText('')
    } catch (err) {
      console.error(err)
    }
  }

  const toggleComplete = async (id, completed) => {
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed })
      })
      const updated = await res.json()
      setTodos((t) => t.map((it) => (it._id === id ? updated : it)))
    } catch (err) {
      console.error(err)
    }
  }

  const removeTodo = async (id) => {
    try {
      await fetch(`${API_BASE}/${id}`, { method: 'DELETE' })
      setTodos((t) => t.filter((it) => it._id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="app">
      <h1>Simple Todo [test]</h1>
      <form onSubmit={addTodo} className="add-form">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a todo"
        />
        <button type="submit">Add</button>
      </form>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo._id} className={todo.completed ? 'done' : ''}>
            <label>
              <input
                type="checkbox"
                checked={!!todo.completed}
                onChange={() => toggleComplete(todo._id, todo.completed)}
              />
              <span>{todo.text}</span>
            </label>
            <button className="delete" onClick={() => removeTodo(todo._id)}>
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
