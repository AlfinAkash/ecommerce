import React, { useEffect, useState } from 'react';
import { getProducts } from '../../api/api'; // Remove selectProduct
import './ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await getProducts();
            setProducts(response.data);
        };
        fetchProducts();
    }, []);

    const productImages = {
        'Smartphone': 'https://i.ibb.co/VWp9618r/Ace-Lea-Xtnt-Kw1-AZf.png',
        'Laptop': 'https://i.ibb.co/CKVrNY7D/laptop-586.png',
        'Headphones': 'https://i.ibb.co/S4JZHJYW/wh-ch520-Primary-image.webp',
        'Smartwatch': 'https://i.ibb.co/CKZM3Q63/5-2-8b8babc2-07ed-4116-8744-cf11894cb3d7.png',
        'Tablet': 'https://i.ibb.co/Jjpj4WBH/265565-ituyae.png',
        'Gaming console': 'https://i.ibb.co/xqt6DStB/590031IM.webp',
        'Wireless speaker': 'https://i.ibb.co/xtkMSX38/302520-0-i6w3cz.png',
        'Monitor': 'https://i.ibb.co/NgsCQ9FX/23-8-Monitor-PI11.png',
        'Keyboard and mouse': 'https://i.ibb.co/66h5MRP/6661b7c929384.png',
        'External hard drive': 'https://i.ibb.co/nq8kNhh5/seagate-expansion-desktop-rear-lo-res.png'
    };

    const handleSelect = async (productId) => {
        const { selectProduct } = await import('../../api/api'); // Import dynamically
        await selectProduct({ userId: 1, productId });
        alert('Product added to cart!');
    };

    return (
        <div className="container">
            <h2>Products</h2>
            <div className="grid">
                {products.map((product) => (
                    <div key={product.id} className="card">
                        <img src={productImages[product.name] || 'https://via.placeholder.com/150'} alt={product.name} className="product-image" />
                        <h3>{product.name}</h3>
                        <p className="description">{product.description}</p>
                        <p className="price">₹{product.price}</p>
                        <button onClick={() => handleSelect(product.id)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
