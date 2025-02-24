import PropTypes from "prop-types"; // Import PropTypes for validation

const Dashboard = ({user}) => {
  return (
    <div className="dashboard">
      <h1>Welcome to Your Personal Dashboard, {user.username}!</h1>
    </div>
  );
};

// Prop validation
Dashboard.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default Dashboard;
