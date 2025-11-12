import { Route, Routes } from 'react-router-dom';
import './App.css';
import UserProfile from './pages/userProfile';
import ProjectSetting from './pages/projectSetting';
import SignUp from './pages/signUp';
import Schedule from './pages/schedule';
import ProjectMain from './pages/projectMain';
import Login from './pages/login';
import Main from './pages/main';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/:teamId' element={<ProjectMain />} />
        <Route path='/:teamId/schedule' element={<Schedule />} />
        <Route path='/profile/:userId' element={<UserProfile />} />
        <Route path='/:teamId/setting' element={<ProjectSetting />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
