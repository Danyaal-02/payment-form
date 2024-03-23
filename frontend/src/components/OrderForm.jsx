import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import OrderFormField from './OrderFormField';
import './OrderForm.css';
import countries from './countries.js';

function OrderForm() {
    const [formData, setFormData] = useState({
        fullName: {
            firstName: '',
            lastName: ''
        },
        email: '',
        contactNumber: '',
        billingAddress: {
            streetAddress: '',
            streetAddressLine2: '',
            city: '',
            stateProvince: '',
            postalCode: '',
            country: ''
        },
        shippingSameAsBilling: false,
        shippingAddress: {
            streetAddress: '',
            streetAddressLine2: '',
            city: '',
            stateProvince: '',
            postalCode: '',
            country: ''
        },
        sendGift: false,
        giftRecipientFullName: {
            firstName: '',
            lastName: ''
        },
        giftMessage: '',
        specialInstructions: '',
        paymentMethod: 'creditCard',
        products: []
    });

    const handleChange = (e) => {
        console.log('Handling change...');
        const { name, value, type, checked } = e.target;
    
        console.log('Name:', name);
        console.log('Value:', value);
        console.log('Type:', type);
        console.log('Checked:', checked);
    
        // For nested fields (e.g., fullName.firstName), handle them separately
        if (name.includes('.')) {
            const [parentName, childName] = name.split('.');
            setFormData(prevData => ({
                ...prevData,
                [parentName]: {
                    ...prevData[parentName],
                    [childName]: type === 'checkbox' ? checked : value
                }
            }));
        } else {
            if (type === 'radio') {
                if (name === 'shippingSameAsBilling' || name === 'sendGift') {
                    setFormData(prevData => ({
                        ...prevData,
                        [name]: value === 'yes',
                        // If "sendGift" is being unchecked, reset giftRecipientFullName and giftMessage
                        ...(name === 'sendGift' && value === 'no' && {
                            giftRecipientFullName: '',
                            giftMessage: ''
                        })
                    }));
                }else if (type === 'radio' && (name === 'paymentMethod')) { // Handle radio inputs for payment method
                    setFormData(prevData => ({
                        ...prevData,
                        [name]: value
                    }));
                }
            } else {
                setFormData(prevData => ({
                    ...prevData,
                    [name]: value
                }));
            }
        }
    };
    
    
    const handleCheckboxChange = (productId, isChecked) => {
        setFormData(prevData => ({
            ...prevData,
            products: isChecked ? [...prevData.products, productId] : prevData.products.filter(id => id !== productId)
        }));
    };
    

    useEffect(() => {
        console.log(formData); // Log formData whenever it changes
    }, [formData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Order submitted successfully:', data);
                // Optionally, you can reset the form data here
                // setFormData({ ...initialFormData });
            } else {
                console.error('Failed to submit order:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting order:', error);
        }
    };

    // Sample product data
    const products = [
        {
            id: 1,
            name: 'T-Shirt',
            image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSuM1uMwTVOES85AZp75Dqe80CIeqQ19GgMG8-iPHopvbBsBcyt',
            price: 1.00,
            sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            colors: ['Green', 'Blue', 'Red', 'Yellow', 'Magenta', 'Grey']
        },
        {
            id: 2,
            name: 'Sweatshirt',
            image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRUlfnlNu5dxVjh0xHBIu-fQ5WXi4xuVL2fSqzqmHrsl4wV8IYM',
            price: 5.00,
            sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            colors: ['Green', 'Blue', 'Red', 'Black', 'Magenta']
        },
        {
            id: 3,
            name: 'Shoes',
            image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQhyMqKYlnrDbFjR_VdwEQvQ3cmbpOxEvOJRsPUTgOoHBfblpCx',
            price: 10.00,
            sizes: ['8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13', '14'],
            colors: ['Yellow', 'Orange', 'Pink']
        }
    ];

    return (
        <div className="container">
            {/* Products section */}
            <div className="products-section">
                <h2>My Products</h2>
                <div className="product-cards">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} onCheckboxChange={handleCheckboxChange} />
                    ))}
                </div>
                <hr />
                <h4>Total: ${formData.products.reduce((total, productId) => {
                    const product = products.find(p => p.id === productId);
                    return total + (product ? product.price : 0);
                }, 0).toFixed(2)}</h4>
            </div>

            {/* Payment form section */}
            <div className="payment-section">
                <h2>Product Order Form</h2>
                <p>Please make sure to fill in the required fields and submit this form to complete your order.</p>
                <form onSubmit={handleSubmit}>
                    {/* Order form fields */}
                    <div>
                        <OrderFormField label="First Name" name="fullName.firstName" type="text" value={formData.fullName.firstName} onChange={handleChange} required description="Enter your first name" />
                        <OrderFormField label="Last Name" name="fullName.lastName" type="text" value={formData.fullName.lastName} onChange={handleChange} required description="Enter your last name" />
                    </div>
                    <div>
                        <OrderFormField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required description="example@example.com" />
                    </div>
                    <div>
                        <OrderFormField label="Contact Number" name="contactNumber" type="tel" value={formData.contactNumber} onChange={handleChange} required description="(000) 000-0000" />
                    </div>
                    <div>
                        <OrderFormField label="Billing Street Address" name="billingAddress.streetAddress" type="text" value={formData.billingAddress.streetAddress} onChange={handleChange} required description="Enter your street address" />
                        <OrderFormField label="Billing Street Address Line 2" name="billingAddress.streetAddressLine2" type="text" value={formData.billingAddress.streetAddressLine2} onChange={handleChange} description="Enter additional address information if needed" />
                        <div>
                            <OrderFormField label="Billing City" name="billingAddress.city" type="text" value={formData.billingAddress.city} onChange={handleChange} required description="Enter your city" />
                            <OrderFormField label="Billing State/Province" name="billingAddress.stateProvince" type="text" value={formData.billingAddress.stateProvince} onChange={handleChange} required description="Enter your state or province" />
                        </div>
                        <div>
                            <OrderFormField label="Billing Postal/Zip Code" name="billingAddress.postalCode" type="text" value={formData.billingAddress.postalCode} onChange={handleChange} required description="Enter your postal or zip code" />
                            <OrderFormField label="Billing Country" name="billingAddress.country" type="select" value={formData.billingAddress.country} onChange={handleChange} required description="Please select your country" options={countries} />
                        </div>
                    </div>
                    <div>
                        <label>
                            Is shipping address same as billing address?:
                            <div>
                                <input type="radio" id="shippingYes" name="shippingSameAsBilling" value="yes" checked={formData.shippingSameAsBilling} onChange={handleChange} />
                                <label htmlFor="shippingYes">Yes</label>
                                <input type="radio" id="shippingNo" name="shippingSameAsBilling" value="no" checked={!formData.shippingSameAsBilling} onChange={handleChange} />
                                <label htmlFor="shippingNo">No</label>
                            </div>
                        </label>
                    </div>

                    {!formData.shippingSameAsBilling && (
                        <div>
                            <h3>Shipping Address</h3>
                            <OrderFormField label="Shipping Street Address" name="shippingAddress.streetAddress" type="text" value={formData.shippingAddress.streetAddress} onChange={handleChange} required description="Enter your street address" />
                            <OrderFormField label="Shipping Street Address Line 2" name="shippingAddress.streetAddressLine2" type="text" value={formData.shippingAddress.streetAddressLine2} onChange={handleChange} description="Enter additional address information if needed" />
                            <div>
                                <OrderFormField label="Shipping City" name="shippingAddress.city" type="text" value={formData.shippingAddress.city} onChange={handleChange} required description="Enter your city" />
                                <OrderFormField label="Shipping State/Province" name="shippingAddress.stateProvince" type="text" value={formData.shippingAddress.stateProvince} onChange={handleChange} required description="Enter your state or province" />
                            </div>
                            <div>
                                <OrderFormField label="Shipping Postal/Zip Code" name="shippingAddress.postalCode" type="text" value={formData.shippingAddress.postalCode} onChange={handleChange} required description="Enter your postal or zip code" />
                                <OrderFormField label="Shipping Country" name="shippingAddress.country" type="select" value={formData.shippingAddress.country} onChange={handleChange} required description="Please select your country" options={countries} />
                            </div>
                        </div>
                    )}
                    <div>
                        <label>
                            Send Gift?:
                            <div>
                                <input type="radio" id="sendGiftYes" name="sendGift" value="yes" checked={formData.sendGift} onChange={handleChange} />
                                <label htmlFor="sendGiftYes">Yes</label>
                                <input type="radio" id="sendGiftNo" name="sendGift" value="no" checked={!formData.sendGift} onChange={handleChange} />
                                <label htmlFor="sendGiftNo">No</label>
                            </div>
                        </label>
                    </div>

                    {formData.sendGift && (
                        <div>
                            <div>
                                <OrderFormField label="Recipient's First Name" name="giftRecipientFullName.firstName" type="text" value={formData.giftRecipientFullName.firstName} onChange={handleChange} />
                                <OrderFormField label="Recipient's Last Name" name="giftRecipientFullName.lastName" type="text" value={formData.giftRecipientFullName.lastName} onChange={handleChange} />
                            </div>
                            <OrderFormField label="Gift Message" name="giftMessage" type="text" value={formData.giftMessage} onChange={handleChange} />
                        </div>
                    )}
                    <OrderFormField label="Special Instructions" name="specialInstructions" type="text" value={formData.specialInstructions} onChange={handleChange} />
                    <div>
                        <label>
                            Payment Methods:
                            <div>
                                <input type="radio" name="paymentMethod" value="creditCard" checked={formData.paymentMethod === 'creditCard'} onChange={handleChange} />
                                Credit Card
                            </div>
                            <div>
                                <input type="radio" name="paymentMethod" value="paypal" checked={formData.paymentMethod === 'paypal'} onChange={handleChange} />
                                PayPal
                            </div>
                        </label>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default OrderForm;

