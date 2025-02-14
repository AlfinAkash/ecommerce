import React, { useEffect, useState } from 'react';
import { getProducts, selectProduct } from '../../api/api';

const Checkout = ({ onProceedToPayment }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await getProducts(); // Replace with API call to fetch selected items
                setCart(response.data);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };
        fetchCartItems();
    }, []);

    const handleRemove = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    const getTotalAmount = () => {
        return cart.reduce((total, item) => total + item.price, 0);
    };

    return (
        <div>
            <h2>Checkout</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul>
                        {cart.map((item) => (
                            <li key={item.id}>
                                {item.name} - ₹{item.price} 
                                <button onClick={() => handleRemove(item.id)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <h3>Total: ₹{getTotalAmount()}</h3>
                    <button onClick={onProceedToPayment}>Proceed to Payment</button>
                </>
            )}
        </div>
    );
};

export default Checkout;
