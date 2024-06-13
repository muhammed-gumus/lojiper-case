import React, { useState, useEffect } from 'react';
import { Debt, PaymentPlan } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

interface NewDebtsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (debt: Debt) => void;
  initialData?: Debt;
}

const NewDebtsPopup: React.FC<NewDebtsPopupProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const { token } = useAuth();
  const [debtName, setDebtName] = useState(initialData?.debtName || '');
  const [lenderName, setLenderName] = useState(initialData?.lenderName || '');
  const [interestRate, setInterestRate] = useState(initialData?.interestRate || 0);
  const [amount, setAmount] = useState(initialData?.amount || 0);
  const [paymentStart, setPaymentStart] = useState(initialData?.paymentStart || '');
  const [installment, setInstallment] = useState(initialData?.installment || 1);
  const [description, setDescription] = useState(initialData?.description || '');
  const [debAmount, setDebAmount] = useState(initialData?.debAmount || 0);

  useEffect(() => {
    if (initialData) {
      setDebtName(initialData.debtName);
      setLenderName(initialData.lenderName);
      setInterestRate(initialData.interestRate);
      setAmount(initialData.amount);
      setPaymentStart(initialData.paymentStart);
      setInstallment(initialData.installment);
      setDescription(initialData.description);
      setDebAmount(initialData.debAmount);
    }
  }, [initialData]);

  const calculatePaymentPlan = (): PaymentPlan[] => {
    const paymentPlan: PaymentPlan[] = [];
    const monthlyAmount = debAmount / installment;
    const startDate = new Date(paymentStart);

    for (let i = 0; i < installment; i++) {
      const paymentDate = new Date(startDate);
      paymentDate.setMonth(paymentDate.getMonth() + i);
      paymentPlan.push({
        paymentDate: paymentDate.toISOString().split('T')[0],
        paymentAmount: monthlyAmount,
        isPaid: false,
      });
    }

    return paymentPlan;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const paymentPlan = calculatePaymentPlan();
    const debt: Debt = {
      id: initialData?.id || '',
      debtName,
      lenderName,
      interestRate,
      amount,
      debAmount,
      paymentStart,
      installment,
      description,
      paymentPlan,
    };
    onSave(debt);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{initialData ? 'Borç Düzenle' : 'Yeni Borç Ekle'}</h2>
        <form onSubmit={handleSubmit} className='text-black'>
          <div className="mb-4">
            <label className="block text-gray-700">Borç Adı</label>
            <input
              type="text"
              value={debtName}
              onChange={(e) => setDebtName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Borç Veren</label>
            <input
              type="text"
              value={lenderName}
              onChange={(e) => setLenderName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Faiz Oranı (%)</label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Borç Miktarı</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Toplam Ödenecek Tutar</label>
            <input
              type="number"
              value={debAmount}
              onChange={(e) => setDebAmount(parseFloat(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Ödeme Başlangıç Tarihi</label>
            <input
              type="date"
              value={paymentStart}
              onChange={(e) => setPaymentStart(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Taksit Sayısı</label>
            <input
              type="number"
              value={installment}
              onChange={(e) => setInstallment(parseInt(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Açıklama</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2">
              İptal
            </button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewDebtsPopup;
