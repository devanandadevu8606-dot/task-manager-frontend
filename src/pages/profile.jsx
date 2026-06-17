import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

function Profile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");

  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.data);
      setName(res.data.data.name);
    } catch (err) {
      toast.error("Failed to load profile");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const updateProfile = async () => {
    try {
      await api.put("/users/me", { name });
      toast.success("Profile updated");
      fetchUser();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  if (!user) return <h2>Loading...</h2>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>👤 Profile</h2>

        <p>Email: {user.email}</p>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <button onClick={updateProfile} style={styles.button}>
          Update Name
        </button>
      </div>
    </div>
  );
}

export default Profile;

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    padding: "30px",
  },
  card: {
    width: "400px",
    padding: "20px",
    background: "white",
    borderRadius: "10px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
  },
  button: {
    marginTop: "10px",
    padding: "10px",
    background: "blue",
    color: "white",
  },
};