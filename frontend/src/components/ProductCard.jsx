import React, { useState } from 'react';
import './ProductCard.css';

function ProductCard({ product, onCheckboxChange }) {
    const { id, name, image, price, sizes, colors } = product;
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (e) => {
        setQuantity(parseInt(e.target.value));
    };

    const handleCheckbox = (e) => {
        onCheckboxChange(id, e.target.checked);
    };

    return (
        <div className="card">
            <label>
                <input type="checkbox" onChange={handleCheckbox} />
            </label>
            <img src={image} alt={name} />
            <h3>{name}</h3>
            <p>Price: ${price.toFixed(2)}</p>
            <label>
                Quantity:
                <select value={quantity} onChange={handleQuantityChange}>
                    {[...Array(10)].map((_, index) => (
                        <option key={index + 1} value={index + 1}>{index + 1}</option>
                    ))}
                </select>
            </label>
            {sizes && (
                <label>
                    {name === 'Shoes' ? 'Shoe Size' : 'T-Shirt Size'}:
                    <select>
                        {sizes.map((size, index) => (
                            <option key={index}>{size}</option>
                        ))}
                    </select>
                </label>
            )}
            {name !== 'Shoes' && colors && (
                <label>
                    Color:
                    <select>
                        {colors.map((color, index) => (
                            <option key={index}>{color}</option>
                        ))}
                    </select>
                </label>
            )}
        </div>
    );
}

export default ProductCard;
