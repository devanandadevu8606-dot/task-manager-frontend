import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div style={styles.wrapper}>
      <Navbar />

      <div style={styles.content}>{children}</div>
    </div>
  );
}

export default Layout;

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    background: "#f4f6f9",
  },

  content: {
    padding: "20px",
  },
};