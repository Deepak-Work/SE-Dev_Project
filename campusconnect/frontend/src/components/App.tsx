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
  return (
    <div id="root">
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/home" element={<LandingPage/>}/>
          <Route path="/club/application" element={<ClubApplication/>}/>
          <Route path="/club/:id" element={<ClubPage/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App;
