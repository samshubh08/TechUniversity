const Razorpay = require("razorpay");
const crypto = require("crypto");
let db = require("../models");
var payment = db.payment;

const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

// eslint-disable-next-line consistent-return
exports.order = async (req, res, next) => {
  const price = req.body.price;
  try {
    const order = await razorpay.orders.create({
      amount: parseInt(price) * 100,
      currency: "INR",
      receipt: "receipt_" + parseInt(Math.random(5) * 1000000),
      payment_capture: "1",
    });
    if (!order) return res.status(400).json("Unable to create order");
    res.status(400).json(order);
  } catch (err) {
    console.log("error", err);
    next(err.message);
  }
};

// eslint-disable-next-line consistent-return
exports.isSuccess = async (req, res, next) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      planId,
    } = req.body;

    const data = {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      planId,
      userId: req.user.id,
    };
    const shasum = crypto.createHmac("sha256", secret.key_secret);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest("hex");

    if (digest !== razorpay_signature) {
      return res.status(statusRes.BAD_REQUEST).json(messageRes.WRONG_SEGMENT);
    }

    res.status(statusRes.OK).json({
      success: true,
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
      signature: razorpaySignature,
    });
  } catch (err) {
    next(err);
  }
};
