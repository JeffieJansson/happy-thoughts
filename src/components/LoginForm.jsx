import { useState } from "react";
import { API_URL } from "../api";

export const LoginForm = ({ handleLogin, onToggleAuth }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill in both fields");
      return;
    }

    setError("");

    try {
      const response = await fetch(`${API_URL}/user/login`, {
        method: "POST",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

    if (!response.ok) {
      throw new Error("Network response was not ok");
      }

  const data = await response.json();

    handleLogin(data.response);
      //reset form
    e.target.reset();
    
    } catch (error) {
      setError("Invalid email or password");
      console.log(error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
     <form className="login-form" onSubmit={handleSubmit}>
       <h2>Log in</h2>
       
         <div className="login-inputs">
          <label>
           Email
            <input
             onChange={handleChange}
             type="email"
             name="email"
             value={formData.email}
           />
          </label>
          <label>
           Password
            <input
            onChange={handleChange}
            type="password"
            name="password"
            value={formData.password}
            />
          </label>
         </div>
      {error && <p className="error-message">{error}</p>}
      <div className="auth-actions">
        <button type="submit">Log In</button>
        <span className="toggle-authform" onClick={onToggleAuth}>
          Don't have an account? Sign up
        </span>
      </div>
    </form>
  );
};

