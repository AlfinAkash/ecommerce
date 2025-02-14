import React, { useState } from 'react';
import { signup, verifyOTP } from '../../api/api'; // Use signup instead of sendOTP
import '../../styles/Auth.css';

const Signup = ({ setStep }) => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [verified, setVerified] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await signup(formData);  // ✅ Use signup instead of sendOTP
            setOtpSent(true);
            alert('OTP sent to your email. Enter OTP to verify.');
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to send OTP.');
        }
    };

    const handleVerifyOTP = async () => {
        if (!otp.trim()) {
            alert('Please enter OTP.');
            return;
        }

        try {
            await verifyOTP({ email: formData.email, otp, name: formData.name, password: formData.password });
            setVerified(true);
            alert('OTP Verified! You can now log in.');
            setStep(3);
        } catch (error) {
            alert(error.response?.data?.message || 'Invalid OTP.');
        }
    };

    return (
        <div className="auth-container">
            <h2>Signup</h2>
            <form onSubmit={handleSignup} className="auth-form">
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <button type="submit" disabled={otpSent}>Sign Up & Get OTP</button>
            </form>

            {otpSent && (
                <div className="otp-section">
                    <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                    <button onClick={handleVerifyOTP} disabled={verified}>Verify OTP</button>
                </div>
            )}
        </div>
    );
};

export default Signup;
