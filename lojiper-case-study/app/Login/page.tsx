"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('https://study.logiper.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.status === 'success') {
        console.log('Login successful, token:', data.data.token);
        login(data.data.token);
        router.push('/Dashboard');
      } else {
        setError(data.data || 'Giriş başarısız.');
      }
    } catch (err: any) {
      setError('Bir hata oluştu: ' + (err.message || 'Bilinmeyen hata'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">Giriş Yap</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center">
            <label className="block text-gray-700 text-sm font-bold mb-2 sm:mb-0 sm:w-1/3">E-posta:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center">
            <label className="block text-gray-700 text-sm font-bold mb-2 sm:mb-0 sm:w-1/3">Parola:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex flex-col justify-center items-center">
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4">
              Giriş Yap
            </button>
            <p className="text-gray-600 flex justify-center">
              Henüz üye değil misiniz?{' '}
              <a href="/Register" className="text-blue-500 hover:text-blue-700 ml-1">
                Kayıt Ol
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
