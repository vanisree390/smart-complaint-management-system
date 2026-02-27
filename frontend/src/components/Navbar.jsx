import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  let user = null;

  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      user = JSON.parse(storedUser);
    }
  } catch (error) {
    console.log("Invalid user in localStorage");
    localStorage.removeItem("user");
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", background: "#333", color: "white" }}>
      <Link to="/user" style={{ marginRight: "15px", color: "white" }}>
        User
      </Link>

      <Link to="/admin" style={{ marginRight: "15px", color: "white" }}>
        Admin
      </Link>

      {user ? (
        <>
          <span style={{ marginRight: "15px" }}>
            Welcome {user.name}
          </span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginRight: "15px", color: "white" }}>
            Login
          </Link>
          <Link to="/register" style={{ color: "white" }}>
            Register
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;