"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const router = useRouter();

  const validateName = (name: string) => /^[a-zA-Z0-9]+$/.test(name);
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password: string) => /^[a-zA-Z0-9]{6,12}$/.test(password);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setError('');

    let hasError = false;

    if (!validateName(name)) {
      setNameError('İsim yalnızca alfa-nümerik karakterler içermelidir.');
      hasError = true;
    }

    if (!validateEmail(email)) {
      setEmailError('Geçerli bir e-posta adresi girin.');
      hasError = true;
    }

    if (!validatePassword(password)) {
      setPasswordError('Parola 6-12 karakter uzunluğunda olmalı ve yalnızca alfa-nümerik karakterler içermelidir.');
      hasError = true;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Parolalar eşleşmiyor.');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const payload = { name, email, password };
    console.log('Payload:', payload); // Debugging için ekledik.
    try {
      const response = await fetch('https://study.logiper.com/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log('Response:', data); // Debugging için ekledik.
      if (data.status === 'success') {
        router.push('/Login');
      } else if (data.data.includes('User already exists')) {
        setError('Bu e-posta adresi zaten kayıtlı.');
      } else {
        setError(data.data);
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Bir hata oluştu.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">Kayıt Ol</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center">
            <label className="block text-gray-700 text-sm font-bold mb-2 sm:mb-0 sm:w-1/3">İsim:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          {nameError && <p className="text-red-500 text-xs italic">{nameError}</p>}
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
          {emailError && <p className="text-red-500 text-xs italic">{emailError}</p>}
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
          {passwordError && <p className="text-red-500 text-xs italic">{passwordError}</p>}
          <div className="flex flex-col sm:flex-row items-center">
            <label className="block text-gray-700 text-sm font-bold mb-2 sm:mb-0 sm:w-1/3">Parolayı Onayla:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          {confirmPasswordError && <p className="text-red-500 text-xs italic">{confirmPasswordError}</p>}
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex flex-col justify-center items-center">
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4">
              Kayıt Ol
            </button>
            <p className="text-gray-600 flex justify-center">
              Hesabın var mı?{' '}
              <a href="/Login" className="text-blue-500 hover:text-blue-700 ml-1">
                Giriş yap!
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
