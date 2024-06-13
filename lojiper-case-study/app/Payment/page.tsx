"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { PaymentPlan } from '../../types';

const Payment = () => {
  const router = useRouter();
  const { token, loading } = useAuth();
  const [paymentPlans, setPaymentPlans] = useState<PaymentPlan[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading) {
      if (!token) {
        router.push('/Login');
      } else {
        fetchPaymentPlans();
      }
    }
  }, [loading, token, router]);

  const fetchPaymentPlans = async () => {
    try {
      const response = await fetch('https://study.logiper.com/finance/payment-plans', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.status === 'success') {
        setPaymentPlans(data.data);
      } else {
        setError('Ödeme planlarını getirirken bir hata oluştu: ' + data.message);
      }
    } catch (err: any) {
      setError('Ödeme planlarını getirirken bir hata oluştu: ' + (err.message || 'Bilinmeyen hata'));
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">Ödeme Planları</h1>
        {error && <p className="text-red-500">{error}</p>}
        <ul>
          {paymentPlans.map((plan) => (
            <li key={plan.paymentDate} className="border-b p-4 flex justify-between">
              <span>{plan.paymentDate}</span>
              <span>{plan.paymentAmount}</span>
              <span>{plan.isPaid ? 'Ödendi' : 'Ödenmedi'}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Payment;
