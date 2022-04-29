import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { AboutPage } from './pages/AboutPage'
import { TodosPage } from './pages/TodosPage'
import { Provider } from 'react-redux'
import { store } from './store/createStore'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route element={<TodosPage />} path='/' />
            <Route element={<AboutPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App
