import { Route, Routes } from 'react-router-dom';
import './App.css';
import UserProfile from './pages/UserProfile';

function App() {

  return (
    <>
      <Routes>
        <Route path='/profile/:userId' element={<UserProfile />} />
      </Routes>
    </>
  );
};

export default App;
