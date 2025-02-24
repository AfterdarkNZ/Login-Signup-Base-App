import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import PropTypes from "prop-types";
import "./Login.css";

const Login = ({setUser}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  //const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track Authentication

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent empty submissions
    if (!formData.email.trim() || !formData.password.trim()) {
      toast.error("Please enter both email and password");
      return;
    }

    try {
      const response = await axios.post("/api/users/login", formData);
      console.log(response.data); // Add this to inspect the structure

      // Store the JWT token for future use (e.g. in LocalStorage)
      const token = response.data.token; // Get the JWT token from the response
      localStorage.setItem("authToken", token);
      console.log(token);

      // Decode the JWT token to get user information
      const userResponse = await axios.get("/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`, // Send the token in the header
        },
      });

      // Extract the username from the response
      const username = userResponse.data.username; // Extract the username from the response data

      toast.success(`Login Successful - Welcome Back ${username}!`);
      // Set the user data to the state immediately
      setUser(userResponse.data);

      // After updating user state, navigate to the dashboard
      navigate("/dashboard");

      // Reset Form
      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || "Login failed. Please check your details and try again"; // Get the error message from the response
      toast.error(errorMessage);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

// Add PropTypes validation
Login.propTypes = {
  setUser: PropTypes.func.isRequired, // setUser is a required function
};

export default Login;
