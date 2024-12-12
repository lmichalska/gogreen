import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import auth from '../firebase-config';

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log(userCredential.user);
            navigate('/login');
        } catch (error) {
            console.error(error.code, error.message);
        }
    };

    return (
        <main>
            <section>
                <div className='auth-form'>
                    <h1>Create an account</h1>
                    <form onSubmit={onSubmit}>
                    <div className='group'>
                            <label htmlFor="email-address">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                placeholder="Email address"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='group'>
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit">Sign up</button>
                    </form>
                    <p>
                        Already have an account?{' '}
                        <NavLink to="/login">Sign in</NavLink>
                    </p>
                </div>
            </section>
        </main>
    );
};

export default Signup;
