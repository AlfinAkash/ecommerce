import React, { useEffect, useState } from 'react';
import { getCartItems } from '../../api/api';
import { handlePayment } from '../../utils/razorpay';

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchCart = async () => {
            const { data } = await getCartItems();
            setCartItems(data);
            setTotal(data.reduce((sum, item) => sum + item.price, 0));
        };
        fetchCart();
    }, []);

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            <ul>
                {cartItems.map((item) => (
                    <li key={item.id}>
                        {item.name} - ₹{item.price}
                    </li>
                ))}
            </ul>
            <h3>Total: ₹{total}</h3>
            <button onClick={() => handlePayment(total)}>Pay with Razorpay</button>
        </div>
    );
};

export default Checkout;
