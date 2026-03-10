import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-400 text-white p-4 flex justify-between">
      <Link to="/" className="font-bold text-lg">
        TravelApp
      </Link>

      <div className="flex gap-4">
        <Link to="/">Home</Link>

        {user ? (
          <>
            <Link to="/my-experiences">My Experiences</Link>
            <Link to="/create">Create</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;