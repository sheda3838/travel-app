import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateExperience from "./pages/CreateExperience";
import EditExperience from "./pages/EditExperience";
import MyExperiences from "./pages/MyExperiences";

import Navbar from "./components/NavBar";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreateExperience />} />
        <Route path="/edit/:id" element={<EditExperience />} />
        <Route path="/my-experiences" element={<MyExperiences />} />
      </Routes>
    </>
  );
}

export default App;