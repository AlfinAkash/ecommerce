import React, { useState } from 'react';
import { verifyOTP } from '../../api/api';

const VerifyOTP = ({ setStep }) => {
    const [otpData, setOtpData] = useState({ email: '', otp: '' });

    const handleChange = (e) => {
        setOtpData({ ...otpData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await verifyOTP(otpData);
            alert('OTP Verified! You can log in now.');
            setStep(3);
        } catch (error) {
            alert(error.response?.data?.message || "OTP verification failed");
        }
    };

    return (
        <div>
            <h2>Verify OTP</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="text" name="otp" placeholder="Enter OTP" onChange={handleChange} required />
                <button type="submit">Verify OTP</button>
            </form>
        </div>
    );
};

export default VerifyOTP;
