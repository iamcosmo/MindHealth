import { useNavigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import LoginRegister from "./pages/LoginRegister";
import ProfilePage from "./pages/ProfilePage";
import { useState } from "react";
import axios from "axios";
import { UserProvider } from "./UserContext";
import Carousel3DMap from "./components/Carousel3DMap";
axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(true);

  const handleLoginOpen = () => {
    setIsLoginOpen(true);
  };

  const handleLoginClose = () => {
    setIsLoginOpen(false);
    navigate("/");
    handleLoginOpen();
  };

  return (
    <>
      <UserProvider>
        <NavBar />
        <Routes>
          <Route
            path="/login"
            element={
              isLoginOpen && <LoginRegister onClose={handleLoginClose} />
            }
          />
          <Route path="/profile/*" element={<ProfilePage />} />
          <Route
            path="/*" // This matches any other route that's not explicitly defined above
            element={<Carousel3DMap />}
          />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
