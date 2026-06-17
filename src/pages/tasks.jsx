import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const [loading, setLoading] = useState(false);

  // GET TASKS
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await api.get("/tasks");
      setTasks(res.data.data);
    } catch (err) {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ADD TASK
  const addTask = async () => {
    if (!title.trim()) {
      toast.error("Enter task");
      return;
    }

    try {
      await api.post("/tasks", { title });
      toast.success("Task Added");
      setTitle("");
      fetchTasks();
    } catch (err) {
      toast.error("Failed to add task");
    }
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      toast.success("Task Deleted");
      fetchTasks();
    } catch (err) {
      toast.error("Delete Failed");
    }
  };

  // TOGGLE COMPLETE
  const toggleTask = async (task) => {
    try {
      await api.put(`/tasks/${task._id}`, {
        completed: !task.completed,
      });

      fetchTasks();
    } catch (err) {
      toast.error("Update Failed");
    }
  };

  // START EDIT
  const startEdit = (task) => {
    setEditingId(task._id);
    setEditTitle(task.title);
  };

  // CANCEL EDIT
  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
  };

  // SAVE EDIT
  const saveEdit = async (id) => {
    if (!editTitle.trim()) {
      toast.error("Title cannot be empty");
      return;
    }

    try {
      await api.put(`/tasks/${id}`, {
        title: editTitle,
      });

      toast.success("Task Updated");

      setEditingId(null);
      setEditTitle("");

      fetchTasks();
    } catch (err) {
      toast.error("Update Failed");
      console.log(err);
    }
  };

  // FILTER + SEARCH
  const filteredTasks = tasks.filter((task) => {
    const matchSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchFilter =
      filter === "all"
        ? true
        : filter === "completed"
        ? task.completed
        : !task.completed;

    return matchSearch && matchFilter;
  });

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>📝 My Tasks</h1>

        {/* ADD TASK */}
        <div style={styles.inputBox}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task..."
            style={styles.input}
          />
          <button onClick={addTask} style={styles.addBtn}>
            Add
          </button>
        </div>

        {/* SEARCH */}
        <input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />

        {/* FILTER */}
        <div style={styles.filters}>
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("completed")}>Completed</button>
          <button onClick={() => setFilter("pending")}>Pending</button>
        </div>

        {/* TASK LIST */}
        {loading ? (
          <p>Loading...</p>
        ) : filteredTasks.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          filteredTasks.map((task) => (
            <div key={task._id} style={styles.task}>
              {editingId === task._id ? (
                <>
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    style={styles.editInput}
                  />

                  <div>
                    <button
                      onClick={() => saveEdit(task._id)}
                      style={styles.editBtn}
                    >
                      Save
                    </button>

                    <button
                      onClick={cancelEdit}
                      style={styles.deleteBtn}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span
                    onClick={() => toggleTask(task)}
                    style={{
                      cursor: "pointer",
                      textDecoration: task.completed
                        ? "line-through"
                        : "none",
                      fontWeight: "600",
                    }}
                  >
                    {task.completed ? "✅ " : "⭕ "}
                    {task.title}
                  </span>

                  <div>
                    <button
                      onClick={() => startEdit(task)}
                      style={styles.editBtn}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteTask(task._id)}
                      style={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Tasks;

/* STYLES */
const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    padding: "40px",
    background: "#f4f6f8",
    minHeight: "100vh",
  },
  card: {
    width: "650px",
    background: "white",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  inputBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
  },
  input: {
    flex: 1,
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
  },
  search: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
  filters: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  addBtn: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
  },
  editBtn: {
    background: "#f59e0b",
    color: "white",
    border: "none",
    marginRight: "8px",
    padding: "6px 10px",
    borderRadius: "6px",
  },
  deleteBtn: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
  },
  task: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px",
    borderBottom: "1px solid #eee",
    alignItems: "center",
  },
  editInput: {
    flex: 1,
    marginRight: "10px",
    padding: "8px",
  },
};