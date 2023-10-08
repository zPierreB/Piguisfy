import Login from './components/Login/Login.jsx'
import Home from './components/Home/Home.jsx'
import { Routes, Route } from "react-router-dom"
import './App.css'
import IsPrivate from './utils/isPrivate.jsx'

function App() {

  return (
    <div className='app'>
      <Routes>
        <Route exact path='/login' element={<Login />}/>
        <Route
          path='/'
          element={
            <IsPrivate>
              <Home />
            </IsPrivate>
          }
        />
      </Routes>
    </div>
  )
}

export default App
