import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <h2>Task Manager</h2>

      <div style={styles.links}>
        {/* NOT LOGGED IN */}
        {!token && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {/* LOGGED IN */}
        {token && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/tasks">Tasks</Link>
            <Link to="/profile">Profile</Link>

            <button onClick={logout} style={styles.logoutBtn}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

// STYLES
const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 25px",
    background: "#007bff",
    color: "white",
  },

  links: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },

  logoutBtn: {
    background: "red",
    color: "white",
    border: "none",
    padding: "6px 10px",
    cursor: "pointer",
    borderRadius: "5px",
  },
};