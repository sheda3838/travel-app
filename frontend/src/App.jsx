import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateExperience from "./pages/CreateExperience";
import EditExperience from "./pages/EditExperience";
import MyExperiences from "./pages/MyExperiences";

import Navbar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/create" element={<CreateExperience />} />
          <Route path="/edit/:id" element={<EditExperience />} />
          <Route path="/my-experiences" element={<MyExperiences />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;