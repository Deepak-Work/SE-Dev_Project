import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import LandingPage from "./LandingPage/LandingPage";
import ClubApplication from "./Club/ClubApplication";
import ClubPage from "./Club/ClubPage";
import PostPage from "./Posts/PostPage"
import Profile from "./Profile/Profile";
import VerifyEmail from "./VerifyEmail";

import LoadingIndicator from "./Utils/LoadingIndicator";


function App() {
  // Used to keep track of whether the user is currently logged in or not
  const [isAuth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
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
    setTimeout(() => {
      setLoading(false);
  }, 500);
  }, []);

  if(loading) {
    return <LoadingIndicator/>
  }

  return (
    <div id="root">
      <Router>
        <Routes>
          <Route path="/" element={<Register /> } />
          <Route path="/login" element={<Login setAuth={setAuth} setUsername={setUsername} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={!isAuth? <LoadingIndicator /> : <LandingPage username={username} isAuth={isAuth} loading={loading} />} />
          <Route path="/club/application" element={<ClubApplication username={username} isAuth={isAuth} loading={loading} />} />
          <Route path="/club/:name/:id" element={!isAuth? <LoadingIndicator /> : <ClubPage username={username} isAuth={isAuth} loading={loading}/>} />
          <Route path="/profile/:name" element={!isAuth? <LoadingIndicator /> : <Profile isAuth={isAuth} loading={loading}/>} />
          <Route path="/post/:id" element={!isAuth? <LoadingIndicator /> : <PostPage isAuth={isAuth} username={username} loading={loading}/>} />
          <Route path="/verify-email/:uid/:token" element={<VerifyEmail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
