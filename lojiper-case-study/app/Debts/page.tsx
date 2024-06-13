"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import { Debt } from "../../types";
import NewDebtsPopup from "../../components/NewDebtsPopup";

const Debts = () => {
  const router = useRouter();
  const { token, loading } = useAuth();
  const [debts, setDebts] = useState<Debt[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedDebt, setSelectedDebt] = useState<Debt | null>(null);

  useEffect(() => {
    if (!loading) {
      if (!token) {
        router.push("/Login");
      } else {
        fetchDebts();
      }
    }
  }, [loading, token, router]);

  const fetchDebts = async () => {
    try {
      const response = await fetch("https://study.logiper.com/finance/debt", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.status === "success") {
        setDebts(data.data);
      } else {
        setError("Borçları getirirken bir hata oluştu: " + data.message);
      }
    } catch (err: any) {
      setError("Borçları getirirken bir hata oluştu: " + (err.message || "Bilinmeyen hata"));
    }
  };

  const handleNewDebt = () => {
    setSelectedDebt(null);
    setIsPopupOpen(true);
  };

  const handleEditDebt = (debt: Debt) => {
    setSelectedDebt(debt);
    setIsPopupOpen(true);
  };

  const handleSaveDebt = async (debt: Debt) => {
    try {
      console.log(debt.id);
      console.log(debt);

      const response = await fetch(
        `https://study.logiper.com/finance/debt${debt.id ? `/${debt.id}` : ""}`,
        {
          method: debt.id ? "PUT" : "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(debt),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.status === "success") {
        fetchDebts();
        setIsPopupOpen(false);
      } else {
        setError("Borç kaydedilirken bir hata oluştu: " + data.message);
      }
    } catch (err: any) {
      setError("Borç kaydedilirken bir hata oluştu: " + (err.message || "Bilinmeyen hata"));
    }
  };

  const handleDeleteDebt = async (debtId: string) => {
    try {
      const response = await fetch(
        `https://study.logiper.com/finance/debt/${debtId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.status === "success") {
        setDebts(debts.filter((debt) => debt.id !== debtId));
      } else {
        setError("Borç silinirken bir hata oluştu: " + data.message);
      }
    } catch (err: any) {
      setError("Borç silinirken bir hata oluştu: " + (err.message || "Bilinmeyen hata"));
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">
          Borçlar
        </h1>
        <button
          onClick={handleNewDebt}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
        >
          Yeni Borç Ekle
        </button>
        {error && <p className="text-red-500">{error}</p>}
        <ul>
          {debts.map((debt) => (
            <li key={debt.id} className="border-b p-4 flex justify-between">
              <span>{debt.debtName}</span>
              <div>
                <button
                  onClick={() => handleEditDebt(debt)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => handleDeleteDebt(debt.id)}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  Sil
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <NewDebtsPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSave={handleSaveDebt}
        initialData={selectedDebt || undefined}
      />
    </div>
  );
};

export default Debts;
