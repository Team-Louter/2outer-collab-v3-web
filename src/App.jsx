import { Route, Routes } from 'react-router-dom';
import './App.css';
import ProjectSetting from './pages/projectSetting';

function App() {

  return (
    <>
      <Routes>
        <Route path='/:teamname/setting' element={<ProjectSetting />} />
      </Routes>
    </>
  );
};

export default App;
