const axios = require("axios");
const db = require('../config/config');

// Initialize payment
exports.initializePayment = async (req, res) => {
  try {
    const { email, amount, customer_name, customer_phone, description, payment_type } = req.body;

    if (!email || !amount) {
      return res.status(400).json({ message: 'Email and amount are required' });
    }

    const reference = `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Save payment record
    await new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO payments (reference, email, amount, customer_name, customer_phone, description, payment_type, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')`,
        [reference, email, amount, customer_name || null, customer_phone || null, description || null, payment_type || 'general'],
        (err) => {
          if (err) return reject(err);
          resolve();
        }
      );
    });

    const callback_url = `${process.env.FRONTEND_URL}/payment/callback`;

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: Math.round(amount * 100), // Convert to kobo
        reference,
        callback_url,
        metadata: {
          customer_name,
          customer_phone,
          description,
          payment_type
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Paystack init error:', error.response?.data || error.message);
    res.status(500).json({
      message: 'Failed to initialize payment',
      error: error.response?.data || error.message
    });
  }
};

// Verify payment
exports.verifyPayment = async (req, res) => {
  try {
    const { reference } = req.params;

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        }
      }
    );

    const { status, amount, customer, transaction_started_at } = response.data.data;

    if (status === 'success') {
      // Update payment record
      await new Promise((resolve, reject) => {
        db.query(
          `UPDATE payments SET status = 'success', paystack_response = ? WHERE reference = ?`,
          [JSON.stringify(response.data), reference],
          (err) => {
            if (err) return reject(err);
            resolve();
          }
        );
      });
    }

    res.json(response.data);
  } catch (error) {
    console.error('Paystack verify error:', error.response?.data || error.message);
    res.status(500).json({
      message: 'Failed to verify payment',
      error: error.response?.data || error.message
    });
  }
};

// Paystack Webhook - called by Paystack server
exports.webhook = async (req, res) => {
  try {
    const { event, data } = req.body;

    if (event === 'transaction.success') {
      const { reference, amount, customer, metadata } = data;

      // Update payment status
      await new Promise((resolve, reject) => {
        db.query(
          `UPDATE payments SET status = 'success', paystack_response = ? WHERE reference = ?`,
          [JSON.stringify(req.body), reference],
          (err) => {
            if (err) return reject(err);
            resolve();
          }
        );
      });

      console.log(`Payment successful: ${reference}`);
    }

    if (event === 'transaction.failed') {
      const { reference } = data;

      await new Promise((resolve, reject) => {
        db.query(
          `UPDATE payments SET status = 'failed', paystack_response = ? WHERE reference = ?`,
          [JSON.stringify(req.body), reference],
          (err) => {
            if (err) return reject(err);
            resolve();
          }
        );
      });
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ message: 'Webhook processing failed' });
  }
};

// Get all payments (admin)
exports.getAllPayments = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = '';
    const params = [];

    if (status) {
      whereClause = 'WHERE status = ?';
      params.push(status);
    }

    const countResult = await new Promise((resolve, reject) => {
      db.query(
        `SELECT COUNT(*) as total FROM payments ${whereClause}`,
        params,
        (err, results) => {
          if (err) return reject(err);
          resolve(results[0]?.total || 0);
        }
      );
    });

    const payments = await new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM payments ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
        [...params, Number(limit), Number(offset)],
        (err, results) => {
          if (err) return reject(err);
          resolve(results || []);
        }
      );
    });

    res.json({
      payments,
      total: countResult,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(countResult / limit)
    });
  } catch (error) {
    console.error('Get payments error:', error);
    res.status(500).json({ message: 'Failed to fetch payments', error: error.message });
  }
};

// Get payment by reference
exports.getPaymentByReference = async (req, res) => {
  try {
    const { reference } = req.params;

    const payment = await new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM payments WHERE reference = ?`,
        [reference],
        (err, results) => {
          if (err) return reject(err);
          resolve(results && results[0] ? results[0] : null);
        }
      );
    });

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.json({ payment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch payment', error: error.message });
  }
};

// Get payment stats
exports.getPaymentStats = async (req, res) => {
  try {
    const stats = await Promise.all([
      new Promise((resolve, reject) => {
        db.query(`SELECT SUM(amount) as total FROM payments WHERE status = 'success'`, [], (err, results) => {
          if (err) return reject(err);
          resolve(results[0]?.total || 0);
        });
      }),
      new Promise((resolve, reject) => {
        db.query(`SELECT COUNT(*) as count FROM payments WHERE status = 'success'`, [], (err, results) => {
          if (err) return reject(err);
          resolve(results[0]?.count || 0);
        });
      }),
      new Promise((resolve, reject) => {
        db.query(`SELECT COUNT(*) as count FROM payments WHERE status = 'pending'`, [], (err, results) => {
          if (err) return reject(err);
          resolve(results[0]?.count || 0);
        });
      }),
      new Promise((resolve, reject) => {
        db.query(`SELECT COUNT(*) as count FROM payments WHERE status = 'failed'`, [], (err, results) => {
          if (err) return reject(err);
          resolve(results[0]?.count || 0);
        });
      }),
    ]);

    res.json({
      totalAmount: Number(stats[0]),
      successCount: stats[1],
      pendingCount: stats[2],
      failedCount: stats[3]
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch stats', error: error.message });
  }
};