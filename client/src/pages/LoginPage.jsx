import { useState } from "react";
import { useAuth } from "../contexts/authentication";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, state } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const success = await login(username, password);
      if (success) {
        console.log("Login successful");
        navigate("/"); // Redirect to home page or dashboard
      } else {
        console.log("Login failed");
        // Show error message to user
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      // Show error message to user
    }
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login Page</h1>
        <div className="input-container">
          <label>
            Username
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter username here"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              value={username}
            />
          </label>
        </div>
        <div className="input-container">
          <label>
            Password
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter password here"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              value={password}
            />
          </label>
        </div>

        <div className="form-actions">
          <button type="submit">Login</button>
        </div>
      </form>
      {state.error && <p className="error-message">{state.error}</p>}
    </div>
  );
}

export default LoginPage;
