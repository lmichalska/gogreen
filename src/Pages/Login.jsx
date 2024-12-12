import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import auth from '../firebase-config'; // Ensure this is correctly exported
import { NavLink, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State to hold error messages

    const onLogin = async (e) => {
        e.preventDefault(); // Prevent page reload
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log(userCredential.user); // Log user data
            navigate('/home'); // Navigate to home page
        } catch (error) {
            setError('Invalid email or password. Please try again.'); // Set error message
            console.error(error.code, error.message); // Log error details
        }
    };

    return (
        <main>
            <section>
                <div className="auth-form">
                    <h1>Log in to an existing account</h1>
                    {error && (
                        <p
                            className="error-message"
                            role="alert"
                            aria-live="polite"
                            style={{ color: 'red' }}
                        >
                            {error}
                        </p>
                    )}
                    <form onSubmit={onLogin}>
                        <div className="group">
                            <label htmlFor="email-address">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                placeholder="Email address"
                                required
                                aria-required="true"
                                aria-label="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="group">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Password"
                                required
                                aria-required="true"
                                aria-label="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <button type="submit" aria-label="Log in">
                                Login
                            </button>
                        </div>
                    </form>
                    <p>
                        No account yet?{' '}
                        <NavLink to="/signup" aria-label="Sign up for a new account">
                            Sign up
                        </NavLink>
                    </p>
                </div>
            </section>
        </main>
    );
};

export default Login;
