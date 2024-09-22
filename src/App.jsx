import "./App.css";
import { LandingPageComponent } from "./components/landing-page";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPageComponent />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
