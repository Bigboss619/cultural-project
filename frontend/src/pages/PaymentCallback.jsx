import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../config/axios';
import { CheckCircle, XCircle, Loader, Home } from 'lucide-react';
import Container from '../components/layout/Container';

const PaymentCallback = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get('reference') || searchParams.get('trxref');
  const [status, setStatus] = useState('loading');
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      if (!reference) {
        setStatus('error');
        return;
      }

      try {
        const resp = await api.get(`/payments/verify/${reference}`);
        const data = resp.data.data;

        if (data.status === 'success') {
          setStatus('success');
          setPaymentData(data);
        } else {
          setStatus('failed');
        }
      } catch (err) {
        console.error('Verify error:', err);
        setStatus('error');
      }
    };

    verifyPayment();
  }, [reference]);

  return (
    <Container>
      <div className="min-h-[60vh] flex items-center justify-center py-12">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          {status === 'loading' && (
            <>
              <Loader className="w-16 h-16 mx-auto mb-4 animate-spin text-amber-600" />
              <h2 className="text-2xl font-bold mb-2">Verifying Payment...</h2>
              <p className="text-gray-600">Please wait while we confirm your payment</p>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600" />
              <h2 className="text-2xl font-bold mb-2 text-green-600">Payment Successful!</h2>
              <p className="text-gray-600 mb-4">
                Thank you for your payment. Your transaction was completed successfully.
              </p>
              {paymentData && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                  <p className="text-sm"><strong>Reference:</strong> {paymentData.reference}</p>
                  <p className="text-sm"><strong>Amount:</strong> ₦{(paymentData.amount / 100).toLocaleString()}</p>
                  <p className="text-sm"><strong>Email:</strong> {paymentData.customer.email}</p>
                </div>
              )}
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              >
                <Home size={20} />
                Back to Home
              </Link>
            </>
          )}

          {(status === 'failed' || status === 'error') && (
            <>
              <XCircle className="w-16 h-16 mx-auto mb-4 text-red-600" />
              <h2 className="text-2xl font-bold mb-2 text-red-600">Payment Failed</h2>
              <p className="text-gray-600 mb-6">
                {status === 'error'
                  ? 'Unable to verify payment. Please contact support.'
                  : 'There was an issue with your payment. Please try again.'}
              </p>
              <div className="flex gap-4 justify-center">
                <Link
                  to="/pricing"
                  className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                >
                  Try Again
                </Link>
                <Link
                  to="/"
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default PaymentCallback;