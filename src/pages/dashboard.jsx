import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await api.get("/auth/me");
        const taskRes = await api.get("/tasks");

        setUser(userRes.data.data);
        setTasks(taskRes.data.data);
      } catch (err) {
        console.log("Dashboard error:", err.response?.data || err.message);
      }
    };

    fetchData();
  }, []);

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  return (
    <div style={styles.container}>
      <h1>📊 Dashboard</h1>

      {user && (
        <div style={styles.userCard}>
          <h2>Welcome {user.name} 👋</h2>
          <p>{user.email}</p>
        </div>
      )}

      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>Total Tasks</h3>
          <p>{total}</p>
        </div>

        <div style={styles.card}>
          <h3>Completed</h3>
          <p>{completed}</p>
        </div>

        <div style={styles.card}>
          <h3>Pending</h3>
          <p>{pending}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

// 🎨 STYLES
const styles = {
  container: {
    padding: "30px",
    background: "#f4f6f9",
    minHeight: "100vh",
  },

  userCard: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },

  grid: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
  },

  card: {
    flex: "1",
    minWidth: "150px",
    background: "#007bff",
    color: "white",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
};