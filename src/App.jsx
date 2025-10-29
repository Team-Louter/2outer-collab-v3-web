import { Route, Routes } from 'react-router-dom';
import './App.css';
import UserProfile from './pages/userProfile';
import ProjectSetting from './pages/projectSetting';
import SignUp from './pages/signUp';
import Schedule from './pages/schedule';
import ProjectMain from './pages/projectMain';

function App() {

  return (
    <>
      <Routes>
        <Route path='/:teamname' element={<ProjectMain />} />
        <Route path='/:teamname/schedule' element={<Schedule />} />
        <Route path='/profile/:userId' element={<UserProfile />} />
        <Route path='/:teamname/setting' element={<ProjectSetting />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
};

export default App;
