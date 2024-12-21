import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    const userData = {
      email,
      password,
    };

    axios
      .post("https://reqres.in/api/login", userData)
      .then((res) => {
        const { token } = res.data; // Extract the token
        setSuccess("Login successful!");
        setError("");
        localStorage.setItem("token", token); // Store token in localStorage
      })
      .catch((err) => {
        setError("Invalid email or password. Please try again.");
        setSuccess("");
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f8fc",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
          width: "400px",
        }}
      >
        <h1 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>
          Login Page
        </h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: "5px",
                color: "#555",
                fontWeight: "bold",
              }}
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                marginBottom: "5px",
                color: "#555",
                fontWeight: "bold",
              }}
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}
          {success && (
            <p style={{ color: "green", marginBottom: "15px" }}>{success}</p>
          )}
          <div style={{ textAlign: "center" }}>
            <button
              type="submit"
              style={{
                backgroundColor: "#007bff",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
