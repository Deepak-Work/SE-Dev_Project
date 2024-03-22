import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import LandingPage from "./LandingPage/LandingPage";
import ClubApplication from "./ClubApplication";
import ClubPage from "./ClubPage";

function App() {
  // Used to keep track of whether the user is currently logged in or not
  const [isAuth, setAuth] = useState(false);

  // Every time the page is re-rendered, this is called
  useEffect(() => {
    let checkAuth = async () => {
      let response = await fetch("http://127.0.0.1:8000/api/authentication/check-auth", {
        method: "GET",
       
      });
      if (response.ok) {
        setAuth(true);
      } else {
        setAuth(false);
      }
    }
    checkAuth();
  }, []);

  return (
    <div id="root">
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/home" element={<LandingPage isAuth={isAuth}/>}/>
          <Route path="/club/application" element={<ClubApplication/>}/>
          <Route path="/club/:id" element={<ClubPage/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App;
