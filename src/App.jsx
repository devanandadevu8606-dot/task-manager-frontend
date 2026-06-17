import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Profile from "./pages/Profile.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Tasks from "./pages/Tasks.jsx";
  import Layout from "./components/Layout"; 
  import ProtectedRoute from "./utils/ProtectedRoute";
   function App() { return ( <BrowserRouter> <Routes> {/* PUBLIC ROUTES */} <Route path="/" element={<Login />} /> <Route path="/login" element={<Login />} /> <Route path="/register" element={<Register />} /> {/* PROTECTED ROUTES */} <Route path="/dashboard" element={ <ProtectedRoute> <Layout> <Dashboard /> </Layout> </ProtectedRoute> } /> <Route path="/tasks" element={ <ProtectedRoute> <Layout> <Tasks /> </Layout> </ProtectedRoute> } /> <Route path="/profile" element={ <ProtectedRoute> <Layout> <Profile /> </Layout> </ProtectedRoute> } /> </Routes> </BrowserRouter> ); } export default App;