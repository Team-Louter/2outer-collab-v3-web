import { Route, Routes } from 'react-router-dom';
import './App.css';
import UserProfile from './pages/UserProfile';
import ProjectSetting from './pages/projectSetting';
import Schedule from './pages/schedule'
import SignUp from './pages/signUp';

function App() {

  return (
    <>
      <Routes>
        <Route path='/:teamname/schedule' element={<Schedule />} />
        <Route path='/profile/:userId' element={<UserProfile />} />
        <Route path='/:teamname/setting' element={<ProjectSetting />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
};

export default App;
