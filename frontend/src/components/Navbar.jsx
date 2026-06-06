import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged Out");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-b from-blue-700 to-blue-400 bg-blue-600 text-white  px-8 py-8 flex justify-between items-center shadow-lg">
  <h1 className="text-3xl font-bold">
        College Finder
      </h1>

      <div className="space-x-4 text-lg font-medium">
        <Link to="/">Home</Link>
        <Link to="/saved-colleges">
          Saved Colleges
        </Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;