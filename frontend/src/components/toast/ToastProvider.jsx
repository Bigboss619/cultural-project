import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback((type, message, { durationMs = 3500 } = {}) => {
    const id = `${Date.now()}_${Math.random().toString(16).slice(2)}`;
    const toast = { id, type, message, durationMs };

    setToasts((prev) => [toast, ...prev]);

    if (durationMs > 0) {
      window.setTimeout(() => {
        removeToast(id);
      }, durationMs);
    }
  }, [removeToast]);

  const api = useMemo(() => ({
    showSuccess: (message, opts) => show('success', message, opts),
    showError: (message, opts) => show('error', message, opts),
  }), [show]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      {/* Render toasts at root so any page can trigger them */}
      <div
        style={{
          position: 'fixed',
          top: 16,
          right: 16,
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          pointerEvents: 'none',
        }}
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            style={{
              pointerEvents: 'none',
              minWidth: 260,
              maxWidth: 360,
              padding: '10px 12px',
              borderRadius: 10,
              border: '1px solid',
              boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
              background: t.type === 'success' ? '#ECFDF5' : '#FEF2F2',
              borderColor: t.type === 'success' ? '#BBF7D0' : '#FECACA',
              color: t.type === 'success' ? '#047857' : '#B91C1C',
              fontSize: 14,
              lineHeight: 1.3,
            }}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return ctx;
}

