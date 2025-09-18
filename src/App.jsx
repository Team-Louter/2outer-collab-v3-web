import { Route, Routes } from 'react-router-dom'
import Schedule from './pages/schedule'
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path='/:teamname/schedule' element={<Schedule />} />
      </Routes>
    </>
  )
}

export default App
