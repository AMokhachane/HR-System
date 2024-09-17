import React, { useState } from 'react';
import styles from './Register.module.css'; // Assuming CSS is scoped via modules
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!username) newErrors.username = "Username is required";
        if (!email) newErrors.email = "Email is required";
        if (!password) newErrors.password = "Password is required";
        if (!confirmPassword) newErrors.confirmPassword = "Confirm password is required";
        if (password !== confirmPassword) newErrors.passwordMismatch = "Passwords do not match";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Simulate registration logic (You can replace this with an actual API call)
            setSuccessMessage("Registration successful!");
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setErrors({});

            // Redirect or handle further logic after registration
            setTimeout(() => {
                navigate('/login'); // Redirect to login page after success
            }, 2000);
        }
    };

    return (
        <div className={styles.registerContainer}>
            <div className={styles.leftSide}>
    <div className={styles.logo}>
        <div className={styles.logoSquare}></div>
        <span className={styles.boldText}>SalarySync</span>
    </div>
                {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
                <form onSubmit={handleRegister}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Username</label>
                        {errors.username && <p className={styles.errorMessage}>{errors.username}</p>}
                        <input
                            type="text"
                            className={styles.inputField}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Email</label>
                        {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
                        <input
                            type="email"
                            className={styles.inputField}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Password</label>
                        {errors.password && <p className={styles.errorMessage}>{errors.password}</p>}
                        <input
                            type="password"
                            className={styles.inputField}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Confirm Password</label>
                        {errors.confirmPassword && <p className={styles.errorMessage}>{errors.confirmPassword}</p>}
                        {errors.passwordMismatch && <p className={styles.errorMessage}>{errors.passwordMismatch}</p>}
                        <input
                            type="password"
                            className={styles.inputField}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className={styles.registerButton}>Register</button>
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

export default Register;