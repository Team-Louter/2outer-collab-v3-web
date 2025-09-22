import { Route, Routes } from 'react-router-dom'
import './App.css'
import ProjectMain from './pages/projectMain'

function App() {

  return (
    <>
      <Routes>
        <Route path='/:teamname' element={<ProjectMain />} />
      </Routes>
    </>
  )
}

export default App
