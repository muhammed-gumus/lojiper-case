"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { Debt, PaymentPlan } from '../../types';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Dashboard = () => {
  const router = useRouter();
  const { token, loading } = useAuth();
  const [debts, setDebts] = useState<Debt[]>([]);
  const [paymentPlans, setPaymentPlans] = useState<PaymentPlan[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading) {
      if (!token) {
        router.push('/Login');
      } else {
        fetchDebts();
        fetchPaymentPlans();
      }
    }
  }, [loading, token, router]);

  const fetchDebts = async () => {
    try {
      const response = await fetch('https://study.logiper.com/finance/debt', {
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
        setDebts(data.data);
      } else {
        setError('Borçları getirirken bir hata oluştu: ' + data.message);
      }
    } catch (err: any) {
      setError('Borçları getirirken bir hata oluştu: ' + (err.message || 'Bilinmeyen hata'));
    }
  };

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

  const debtNames = debts.map(debt => debt.debtName);
  const debtAmounts = debts.map(debt => debt.amount);
  const paymentDates = paymentPlans.map(plan => plan.paymentDate);
  const paymentAmounts = paymentPlans.map(plan => plan.paymentAmount);

  const debtData = {
    labels: debtNames,
    datasets: [
      {
        label: 'Borç Miktarları',
        data: debtAmounts,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const paymentData = {
    labels: paymentDates,
    datasets: [
      {
        label: 'Ödeme Miktarları',
        data: paymentAmounts,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 p-4">
      <div className="flex-grow">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center text-black">Dashboard</h1>
          {error && <p className="text-red-500">{error}</p>}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4 text-black">Borçlar</h2>
            <Bar data={debtData} />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4 text-black">Ödeme Planları</h2>
            <Bar data={paymentData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
