import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import LandingPage from "./LandingPage/LandingPage";
import ClubApplication from "./Club/ClubApplication";
import ClubPage from "./Club/ClubPage";
import Profile from "./Profile/Profile";
import Members from "./Club/Members";

import LoadingIndicator from "./Utils/LoadingIndicator";


function App() {
  // Used to keep track of whether the user is currently logged in or not
  const [isAuth, setAuth] = useState(false);
  const [username, setUsername] = useState("");
  // const navigate = useNavigate();

  // const navigate = useNavigate();
  // Every time the page is re-rendered, this is called
  useEffect(() => {
    let checkAuth = async () => {
      try {
        let response = await fetch("/api/authentication/isauth", {
          method: "GET",
        });
        if (response.ok) {
          setAuth(true);
          response.json().then((value) => setUsername(value.username));
        } else {
          setAuth(false);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        // Handle error (e.g., display error message)
      }
    };
    checkAuth();
  }, []);

  return (
    <div id="root">
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/home" element={<LandingPage isAuth={isAuth}/>} /> */}
          <Route path="/home" element={isAuth === null ? <LoadingIndicator /> : <LandingPage username={username} isAuth={isAuth} />} />
          <Route path="/club/application" element={<ClubApplication />} />
          <Route path="/club/:name/:id" element={isAuth === null ? <LoadingIndicator /> : <ClubPage username={username} isAuth={isAuth}/>} />
          <Route path="/club/:name/members" element={isAuth === null ? <LoadingIndicator /> : <Members username={username} isAuth={isAuth}/>} />
          <Route path="/profile/:name" element={isAuth === null ? <LoadingIndicator /> : <Profile isAuth={isAuth}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
