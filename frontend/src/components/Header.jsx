import "./Header.css";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import PropTypes from "prop-types"; // Import PropTypes for validation

const Header = ({isSignup, setIsSignup, user, handleLogout, setUser}) => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="/path-to-logo.png" alt="Logo" className="logo" />
        <div>
          <h1>Blah</h1>
          <p>blah blah</p>
        </div>
      </div>
      {!user ? (
        <div className="auth-container">
          {isSignup ? <Signup setUser={setUser} /> : <Login setUser={setUser} />}
          <button onClick={() => setIsSignup(!isSignup)}>{isSignup ? "Already have an account? Login" : "New User? Sign Up"}</button>
          <button className="guest-button" onClick={() => alert("Guest Dashboard Coming Soon!")}>
            Guest Access
          </button>
        </div>
      ) : (
        <div className="user-header">
          <span>
            Welcome Back, <strong>{user.username}</strong>!
          </span>
          <p className="email">Email: {user.email}</p>

          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

Header.propTypes = {
  isSignup: PropTypes.bool.isRequired,
  setIsSignup: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
  handleLogout: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default Header;
