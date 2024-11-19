import { useState, useEffect } from "react";
import { useAuth } from "../contexts/authentication";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const success = await register(username, password, firstName, lastName);
      if (success) {
        setPopupMessage("Registration successful!");
        setPopupType("success");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setPopupMessage("Registration failed. Please try again.");
        setPopupType("error");
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
      setPopupMessage("An error occurred. Please try again.");
      setPopupType("error");
    }
    setIsPopupVisible(true);
  };

  useEffect(() => {
    if (isPopupVisible) {
      const timer = setTimeout(() => {
        setIsPopupVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isPopupVisible]);
  return (
    <div className="register-form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Register Form</h1>
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
              autoComplete="username"
              required
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
              autoComplete="new-password"
              required
            />
          </label>
        </div>
        <div className="input-container">
          <label>
            First Name
            <input
              id="firstname"
              name="firstname"
              type="text"
              placeholder="Enter first name here"
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
              value={firstName}
              autoComplete="given-name"
              required
            />
          </label>
        </div>
        <div className="input-container">
          <label>
            Last Name
            <input
              id="lastname"
              name="lastname"
              type="text"
              placeholder="Enter last name here"
              onChange={(event) => {
                setLastName(event.target.value);
              }}
              value={lastName}
              autoComplete="family-name"
              required
            />
          </label>
        </div>
        <div className="form-actions">
          <button type="submit">Submit</button>
        </div>
      </form>
      {isPopupVisible && (
        <div
          className={`
            fixed bottom-10 right-10 px-4 py-2 rounded-md text-white
            ${popupType === "success" ? "bg-green-500" : "bg-red-500"}
            transition-all duration-500 ease-in-out
            transform ${isPopupVisible ? "translate-y-0" : "translate-y-full"}
          `}
        >
          {popupMessage}
        </div>
      )}
    </div>
  );
}

export default RegisterPage;
