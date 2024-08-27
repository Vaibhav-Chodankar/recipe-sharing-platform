import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await registerUser({ name, email, password });
            localStorage.setItem('token', data.token);
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="card shadow-sm" style={{ width: '400px' }}>
                <div className="card-body">
                    <h3 className="card-title text-center mb-4">Register</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label d-block text-start">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder='John Doe'
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label d-block text-start">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='someone@domain.com'
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label d-block text-start">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Register</button>
                    </form>
                    <div className="text-center mt-3">
                        <p>Already have an account? <a href="/login">Login here</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
