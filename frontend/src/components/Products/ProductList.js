import React, { useEffect, useState } from 'react';
import { getProducts, selectProduct } from '../../api/api';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await getProducts();
            setProducts(response.data);
        };
        fetchProducts();
    }, []);

    const handleSelect = async (productId) => {
        await selectProduct({ userId: 1, productId });
        alert('Product added for checkout!');
    };

    return (
        <div>
            <h2>Products</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - ₹{product.price} 
                        <button onClick={() => handleSelect(product.id)}>Buy</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
