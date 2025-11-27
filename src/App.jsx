import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProfile from "./pages/userProfile";
import ProjectSetting from "./pages/projectSetting";
import SignUp from "./pages/signUp";
import Schedule from "./pages/schedule";
import ProjectMain from "./pages/projectMain";
import Login from "./pages/login";
import Main from "./pages/main";
import Minutes from "./pages/minutes";
import MyTodolist from "./pages/myTodolist";
import Notice from "./pages/notice";
import Activity from "./pages/activity";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Chatting from "./pages/chatting";

function App() {
  return (
    <>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover={false}
        draggable
        limit={1}
        transition={Bounce}
        theme="light"
      />
      
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/login" element={<Login />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Main />} />
          <Route path="/:teamId" element={<ProjectMain />} />
          <Route path="/:teamId/schedule" element={<Schedule />} />
          <Route path="/profile/:userId" element={<UserProfile />} />
          <Route path="/:teamId/setting" element={<ProjectSetting />} />
          <Route path="/:teamId/minutes" element={<Minutes />} />
          <Route path="/:teamId/todos" element={<MyTodolist />} />
          <Route path="/:teamId/notice" element={<Notice />} />
          <Route path="/:teamId/report" element={<Activity />} />
          <Route path="/:teamId/chatting" element={<Chatting />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
