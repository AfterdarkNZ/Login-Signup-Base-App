import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import PropTypes from "prop-types";
import "./Signup.css";

const Signup = ({setUser}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/signup", formData);

      // Save JWT token to local storage
      const token = response.data.token; // Get the JWT token from the response
      localStorage.setItem("authToken", token);
      console.log(token);

      // Fetch user details using the token
      const userResponse = await axios.get("/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`, // Send the token in the header
        },
      });

      // Extract the username from the response
      const username = userResponse.data.username;

      // Show success message
      toast.success(`Welcome, ${username}! Signup successful. Redirecting to your dashboard...`);

      // Set the user data to the state immediately
      setUser(userResponse.data);

      // Reset Form
      setFormData({
        username: "",
        email: "",
        password: "",
      });

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

// Add PropTypes validation
Signup.propTypes = {
  setUser: PropTypes.func.isRequired, // setUser is a required function
};

export default Signup;
