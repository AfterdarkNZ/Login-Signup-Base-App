import {useState, useEffect} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import axios from "axios";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Dashboard from "./components/Dashboard.jsx";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import {ToastContainer, toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [isSignup, setIsSignup] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // UseEffect to check for existing user when app loads
  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`, // Send the token in the header
            },
          };
          const response = await axios.get("/api/users/me", config);
          setUser(response.data); // { username, email } from the server
        } catch (err) {
          console.error(err.response?.data?.message || "Error fetching user");
        }
      }
    };
    fetchUserDetails();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    toast.success("You have been successfully logged out.");
    navigate("/"); // Redirect to the landing page after logout
  };

  return (
    <div>
      <Header isSignup={isSignup} setIsSignup={setIsSignup} user={user} handleLogout={handleLogout} setUser={setUser} />
      <Routes>
        <Route path="/" element={!user ? <LandingPage /> : <Dashboard user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <LandingPage />} />
      </Routes>
      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
