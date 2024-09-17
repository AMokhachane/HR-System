import React, { useState } from "react";
import styles from "./Login.module.css"; // Assuming CSS is scoped via modules
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};
    if (!username) newErrors.username = "Username is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate login logic (You can replace this with an actual API call)
      setSuccessMessage("Login successful!");
      setUsername("");
      setPassword("");
      setErrors({});
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <div className={styles.logoSquare}></div>
          <span className={styles.boldText}>SalarySync</span>
        </div>
        {successMessage && (
          <p className={styles.successMessage}>{successMessage}</p>
        )}
        <form onSubmit={handleLogin}>
          <div className={styles.Group}>
            <label className={styles.label}>Username</label>
            {errors.username && (
              <p className={styles.errorMessage}>{errors.username}</p>
            )}
            <input
              type="text"
              className={styles.inputField}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className={styles.Group}>
            <label className={styles.label}>Password</label>
            {errors.password && (
              <p className={styles.errorMessage}>{errors.password}</p>
            )}
            <input
              type="password"
              className={styles.inputField}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.forgotPasswordAndButton}>
            <Link to="/forgot-password" className={styles.forgotPassword}>
              Forgot Password?
            </Link>
            <button type="submit" className={styles.loginButton}>
              Login
            </button>
          </div>
        </form>
      </div>

      <div className={styles.rightSide}>
        <div className={styles.iconGrid}>
          <div className={styles.circle}></div>
          <div className={styles.square}></div>
          <div className={styles.circle}></div>
          <div className={styles.square}></div>
          <div className={styles.circle}></div>
          <div className={styles.square}></div>
          <div className={styles.circle}></div>
          <div className={styles.square}></div>
          <div className={styles.circle}></div>
        </div>
      </div>
    </div>
  );
};

export default Login;