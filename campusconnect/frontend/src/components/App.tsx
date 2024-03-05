import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import LandingPage from "./LandingPage";
import ClubApplication from "./ClubApplication";

function App() {
  return (
    <div id="root">
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/home" element={<LandingPage/>}/>
          <Route path="/create-club" element={<ClubApplication/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App;
