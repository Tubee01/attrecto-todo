import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Login from "./routes/login/Login";
import Home from "./routes/home/Home";
import { useLocation, useNavigate } from 'react-router-dom'
import PageLoading from "./lib/components/PageLoading";
import Registration from "./routes/registration/Registration";
import Todos from "./routes/todo/Todos";

const App = () => {
  const value = useContext(AuthContext);
  const auth = value?.auth;
  const isLoading = value?.isLoading;
  const location = useLocation();
  const navigate = useNavigate();
  if (location.pathname !== "/" && !auth?.isAuthenticated) {
    navigate('/');
  }


  let routes = (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
    </Routes>
  );

  if (auth?.isAuthenticated) {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos" element={<Todos />} />
      </Routes>
    );
  }

  return isLoading ? <PageLoading /> : routes;
};

export default App;