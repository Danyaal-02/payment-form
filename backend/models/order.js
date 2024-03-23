// models/Order.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const orderSchema = new Schema({
    fullName: {
        type: {
            firstName: {
                type: String,
                required: true
            },
            lastName: {
                type: String,
                required: true
            }
        },
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    billingAddress: {
        streetAddress: {
            type: String,
            required: true
        },
        streetAddressLine2: String,
        city: {
            type: String,
            required: true
        },
        stateProvince: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    shippingAddressSameAsBilling: {
        type: Boolean,
        default: true
    },
    shippingAddress: {
        streetAddress: {
            type: String,
            required: function() {
                return !this.shippingAddressSameAsBilling; // Required if shipping address is different
            }
        },
        streetAddressLine2: {
            type: String,
            required: function() {
                return !this.shippingAddressSameAsBilling; // Required if shipping address is different
            }
        },
        city: {
            type: String,
            required: function() {
                return !this.shippingAddressSameAsBilling; // Required if shipping address is different
            }
        },
        stateProvince: {
            type: String,
            required: function() {
                return !this.shippingAddressSameAsBilling; // Required if shipping address is different
            }
        },
        postalCode: {
            type: String,
            required: function() {
                return !this.shippingAddressSameAsBilling; // Required if shipping address is different
            }
        },
        country: {
            type: String,
            required: function() {
                return !this.shippingAddressSameAsBilling; // Required if shipping address is different
            }
        }
    },
    sendGift: {
        type: Boolean,
        default: false
    },
    giftRecipientFullName: {
        type: {
            firstName: {
                type: String,
                required: function() {
                    return this.sendGift; // Required if sendGift is true
                }
            },
            lastName: {
                type: String,
                required: function() {
                    return this.sendGift; // Required if sendGift is true
                }
            }
        }
    },
    giftMessage: String,
    specialInstructions: String,
    paymentMethod: {
        type: String,
        enum: ['creditCard', 'paypal'],
        default: 'creditCard'
    },
    products: []
});

const Order = model('Order', orderSchema);

export default Order;
