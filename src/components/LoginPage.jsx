import React, { useState } from 'react';
import './styles.css'; // Assuming styles are moved to a separate CSS file

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add login functionality here
        console.log('Logged in with:', username, password);
    };

    return (
        <div className="login-container">
            <h2>Login to ISLConnect</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <p className="signup-link">
                Don't have an account? <a href="#">Sign up here</a>
            </p>
        </div>
    );
};

export default LoginPage;
