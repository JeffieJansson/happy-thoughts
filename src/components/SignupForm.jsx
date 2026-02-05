import { useState } from "react";
import { API_URL } from "../api";


export const SignupForm = ({ handleLogin }) => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill in both fields");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/user/signup`, {
        method: "POST",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

    
      if (!response.ok && response.status > 499) {
        throw new Error("Server error.");
      }

      const resJson = await response.json();
      
      if (!resJson.success) {
        throw new Error(resJson.message || "Failed to create user");
      }

      handleLogin(resJson.response);

      // Reset form
      e.target.reset();

    } catch (error) {
      setError(error.message);
      console.log("error occurred during signup", error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Sign up</h2>

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

      <button type="submit">Sign up</button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};