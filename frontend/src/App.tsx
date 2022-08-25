import { Route, Routes } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import Login from "./routes/login/Login";
import Home from "./routes/home/Home";
import { useLocation, useNavigate } from 'react-router-dom'
import PageLoading from "./lib/components/PageLoading";
import Registration from "./routes/registration/Registration";

const App = () => {
  const value = useAuthContext()
  const auth = value?.auth;
  const isLoading = value?.isLoading;
  const location = useLocation();
  const navigate = useNavigate();
  if (location.pathname === "/logout") {
    navigate("/")
  }

  if ((location.pathname !== "/" && location.pathname !== "/registration") && !auth?.isAuthenticated) {
    navigate('/');
  }

  let routes = (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registration" element={<Registration withLogin />} />
    </Routes>
  );

  if (auth?.isAuthenticated) {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-user" element={<Registration withLogin={false} />} />
      </Routes>
    );
  }

  return isLoading ? <PageLoading /> : routes;
};

export default App;