import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/Posts/PostDetails/PostDetails";
import "./index.css";
function App() {
  const user = JSON.parse(localStorage.getItem("profile") || "{}");

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/posts" element={<Home />} />
        <Route path="/posts/search" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="*" element={<Navigate to="/posts" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
