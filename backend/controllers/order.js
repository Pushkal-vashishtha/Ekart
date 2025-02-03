import Razorpay from 'razorpay';
import crypto from 'crypto';
import Order from '../models/order.js';
import Transaction from '../models/transaction.js';
import { stat } from 'fs';
import mongoose

from 'mongoose';
const createTransaction = async (req, res) => {
    const { amount, userId } = req.body;

    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,

    });

    const options = {
        amount: amount,
        currency: "INR",
        receipt: `receipt#${Date.now()}`,
    }
    try {
        if (!amount || !userId) {
            return res.status(400).json({
                success: false,
                message: "Amount and userId are required"
            });
        }

        const razorpayOrder = await razorpay.orders.create(options);

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            key: process.env.RAZORPAY_KEY_ID,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            order_id: razorpayOrder.id,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to place order",
            error: error.message
        });
    }
}


const createOrder = async (req, res) => {
    const {
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
        userId,
        cartItems,
        deliveryDate,
        address,
    } = req.body;

    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    
    const userObjectId = new mongoose.Types.ObjectId(userId);
    
    const generated_signature = crypto.createHmac('sha256', key_secret)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest('hex');

    if (generated_signature == razorpay_signature) {
        try {
            const transaction = await Transaction.create({
                user: userId,
                orderId: razorpay_order_id,
                paymentId: razorpay_payment_id,
                status: "success",
                amount: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
            });

            const order = await Order.create({
                user: userObjectId,
                address,
                deliveryDate,
                items: cartItems.map(item => ({
                    product: item?._id,
                    quantity: item?.quantity,
                    //price:item.price,
                })),
                status: "Order Placed",
            });

            transaction.order = order._id;
            await transaction.save();
            res.json({
                success: true,
                message: "Payment Verified and Order Created",
                order,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to create transaction or order",
                error: error.message
            });
        }
    }
}

const getOrdersByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const orders = await Order.find({ user: userId })
        .populate("user","name email")
        .populate("items.product","name price image_uri ar_uri")
        .sort({ createdAt: -1 });

        if(!orders || orders.length === 0){
            return res.status(404).json({
                success: false,
                message: "No orders found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            orders,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch orders",
            error: error.message
        });
    }
}
export { createTransaction, createOrder, getOrdersByUserId };