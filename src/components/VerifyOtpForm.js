import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyOtpForm = () => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:9090/api/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    otp,
                }),
            });

            if (response.ok) {
                navigate('/dashboard');
            } else {
                setError('Invalid or expired OTP!');
            }
        } catch (error) {
            setError('Failed to connect to the server.');
        }
    };

    return (
        <div className="form-container">
            <h2>Verify OTP</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>OTP:</label>
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                </div>
                <button type="submit">Verify</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default VerifyOtpForm;

