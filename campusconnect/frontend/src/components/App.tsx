import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Login from "./Login";

// import Login from './Login';

function App() {
  return (
    <div id="root">
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App;
