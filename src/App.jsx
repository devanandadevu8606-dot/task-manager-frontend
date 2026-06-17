import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Profile from "./pages/profile.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Tasks from "./pages/tasks.jsx";
  import Layout from "./components/layout"; 
  import ProtectedRoute from "./utils/protectedRoute";
   function App() { return ( <BrowserRouter> <Routes> {/* PUBLIC ROUTES */} <Route path="/" element={<Login />} /> <Route path="/login" element={<Login />} /> <Route path="/register" element={<Register />} /> {/* PROTECTED ROUTES */} <Route path="/dashboard" element={ <ProtectedRoute> <Layout> <Dashboard /> </Layout> </ProtectedRoute> } /> <Route path="/tasks" element={ <ProtectedRoute> <Layout> <Tasks /> </Layout> </ProtectedRoute> } /> <Route path="/profile" element={ <ProtectedRoute> <Layout> <Profile /> </Layout> </ProtectedRoute> } /> </Routes> </BrowserRouter> ); } export default App;