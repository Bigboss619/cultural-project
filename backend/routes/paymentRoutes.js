const express = require("express");
const router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');

const {
    initializePayment,
    verifyPayment,
    webhook,
    getAllPayments,
    getPaymentByReference,
    getPaymentStats
} = require("../controllers/paymentController");

// Public routes
router.post("/initialize", initializePayment);
router.get("/verify/:reference", verifyPayment);
router.post("/webhook", webhook); // Paystack calls this

// Protected routes (admin)
router.get("/", requireAuth, getAllPayments);
router.get("/stats", requireAuth, getPaymentStats);
router.get("/:reference", requireAuth, getPaymentByReference);

module.exports = router;