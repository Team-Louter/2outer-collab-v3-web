import { Route, Routes } from 'react-router-dom';
import './App.css';
import UserProfile from './pages/UserProfile';
import ProjectSetting from './pages/projectSetting';

function App() {

  return (
    <>
      <Routes>
        <Route path='/profile/:userId' element={<UserProfile />} />
        <Route path='/:teamname/setting' element={<ProjectSetting />} />
      </Routes>
    </>
  );
};

export default App;
