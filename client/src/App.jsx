// import logo from './logo.svg';
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin/Admin";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
