import React, { useState } from 'react';
import api from '../../config/axios';
import { X, CreditCard, Loader } from 'lucide-react';

const PaymentModal = ({ isOpen, onClose, amount, description = 'Membership Payment', paymentType = 'membership', onSuccess }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handlePayment = async () => {
    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!amount || amount <= 0) {
      setError('Invalid amount');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.post('/payments/initialize', {
        email: email.trim(),
        amount: amount,
        customer_name: name.trim(),
        customer_phone: phone.trim(),
        description,
        payment_type: paymentType
      });

      if (response.data.data && response.data.data.authorization_url) {
        // Redirect to Paystack payment page
        window.location.href = response.data.data.authorization_url;
      } else {
        throw new Error('Failed to get payment URL');
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.response?.data?.message || 'Failed to initialize payment. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <CreditCard size={24} />
            Make Payment
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Amount Display */}
          <div className="text-center p-4 bg-gradient-to-br from-amber-600 to-orange-700 rounded-lg text-white">
            <p className="text-sm opacity-80">Amount to pay</p>
            <p className="text-3xl font-bold">₦{amount.toLocaleString()}</p>
            {description && <p className="text-sm mt-1 opacity-80">{description}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email Address *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500"
              placeholder="your@email.com"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500"
              placeholder="John Doe"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500"
              placeholder="+234 xxx xxx xxxx"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-amber-600 to-orange-700 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="animate-spin" size={20} />
                Processing...
              </>
            ) : (
              <>
                <CreditCard size={20} />
                Pay with Paystack
              </>
            )}
          </button>

          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            Secured by Paystack. Your payment details are encrypted.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;