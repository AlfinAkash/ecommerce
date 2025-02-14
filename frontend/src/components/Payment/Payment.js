import React from 'react';
import { createOrder, verifyPayment } from '../../api/api';

const Payment = () => {
    const handlePayment = async () => {
        const { data } = await createOrder({ userId: 1, productId: 1 });

        const options = {
            key: "YOUR_RAZORPAY_KEY",
            amount: data.amount,
            currency: data.currency,
            order_id: data.orderId,
            handler: async (response) => {
                await verifyPayment({ order_id: data.orderId, payment_id: response.razorpay_payment_id, signature: response.razorpay_signature, userId: 1 });
                alert("Payment Successful!");
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return <button onClick={handlePayment}>Pay with Razorpay</button>;
};

export default Payment;
