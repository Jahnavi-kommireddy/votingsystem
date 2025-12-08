import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Vote, User, Lock, KeyRound } from 'lucide-react';

const Auth: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const { login, register, resetPassword } = useAuth();
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });

  const [regForm, setRegForm] = useState({
    name: '',
    dob: '',
    phone: '',
    voterId: '',
    username: '',
    password: ''
  });

  const [resetForm, setResetForm] = useState({
    username: '',
    voterId: '',
    newPassword: ''
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const validateVoterId = (id: string) => /^[A-Za-z]{3}\d{7}$/.test(id);
  const validatePhone = (num: string) => /^\d{10}$/.test(num);
  const validatePassword = (pwd: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#!]).{6,}$/.test(pwd);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
  };

  const handleRegChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegForm(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleResetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResetForm(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    const { username, password } = loginForm;
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    
    const loggedIn = login(username, password);
    
    if (loggedIn) {
      setSuccess('Login successful!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } else {
      setError('Invalid username or password');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    const { name, dob, phone, voterId, username, password } = regForm;

    if (!name || !dob || !phone || !voterId || !username || !password) {
      setError('Please fill all fields');
      return;
    }

    if (!validatePhone(phone)) {
      setError('Phone number must be 10 digits');
      return;
    }

    if (!validateVoterId(voterId)) {
      setError('Voter ID must be 3 letters followed by 7 digits (e.g. ABC1234567)');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must contain uppercase, lowercase, number, and @#! symbol');
      return;
    }

    const registered = register({
      name, dob, phone, voterId, username, password
    });

    if (registered) {
      setSuccess('Registration successful! Please log in.');
      setRegForm({
        name: '', dob: '', phone: '', voterId: '', username: '', password: ''
      });
      setTimeout(() => {
        setMode('login');
        setSuccess(null);
      }, 2000);
    } else {
      setError('Username or Voter ID already exists');
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { username, voterId, newPassword } = resetForm;

    if (!username || !voterId || !newPassword) {
      setError('Please fill all fields');
      return;
    }

    if (!validateVoterId(voterId)) {
      setError('Invalid Voter ID format');
      return;
    }

    if (!validatePassword(newPassword)) {
      setError('New password must contain uppercase, lowercase, number, and @#! symbol');
      return;
    }

    const reset = resetPassword(username, voterId, newPassword);

    if (reset) {
      setSuccess('Password reset successful! Please login with your new password.');
      setResetForm({ username: '', voterId: '', newPassword: '' });
      setTimeout(() => {
        setMode('login');
        setSuccess(null);
      }, 2000);
    } else {
      setError('Invalid username or Voter ID');
    }
  };

  return (
    <div className="page-transition min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <div className="flex justify-center">
            <Vote className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">
            {mode === 'login' && 'Sign in to your account'}
            {mode === 'register' && 'Create a new account'}
            {mode === 'forgot' && 'Reset your password'}
          </h2>
          <div className="mt-2 text-sm text-gray-600">
            {mode === 'login' && (
              <>
                <p>
                  Don't have an account?{' '}
                  <button
                    onClick={() => {
                      setMode('register');
                      setError(null);
                      setSuccess(null);
                    }}
                    className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition-colors duration-200"
                  >
                    Register here
                  </button>
                </p>
                <p className="mt-1">
                  <button
                    onClick={() => {
                      setMode('forgot');
                      setError(null);
                      setSuccess(null);
                    }}
                    className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition-colors duration-200"
                  >
                    Forgot password?
                  </button>
                </p>
              </>
            )}
            {(mode === 'register' || mode === 'forgot') && (
              <p>
                Already have an account?{' '}
                <button
                  onClick={() => {
                    setMode('login');
                    setError(null);
                    setSuccess(null);
                  }}
                  className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition-colors duration-200"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="text-green-700">{success}</p>
          </div>
        )}

        {mode === 'login' && (
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-4">
                <label htmlFor="username" className="sr-only">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="appearance-none rounded-md relative block w-full pl-10 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Username"
                    value={loginForm.username}
                    onChange={handleLoginChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none rounded-md relative block w-full pl-10 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Password"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </button>
            </div>
          </form>
        )}

        {mode === 'register' && (
          <form className="mt-8 space-y-6" onSubmit={handleRegister}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="John Doe"
                  value={regForm.name}
                  onChange={handleRegChange}
                />
              </div>
              
              <div>
                <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                  id="dob"
                  name="dob"
                  type="date"
                  required
                  className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={regForm.dob}
                  onChange={handleRegChange}
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number (10 digits)
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  required
                  className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="1234567890"
                  value={regForm.phone}
                  onChange={handleRegChange}
                />
              </div>
              
              <div>
                <label htmlFor="voterId" className="block text-sm font-medium text-gray-700">
                  Voter ID (format: ABC1234567)
                </label>
                <input
                  id="voterId"
                  name="voterId"
                  type="text"
                  required
                  className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="ABC1234567"
                  value={regForm.voterId}
                  onChange={handleRegChange}
                />
              </div>
              
              <div>
                <label htmlFor="reg-username" className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  id="reg-username"
                  name="username"
                  type="text"
                  required
                  className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="username"
                  value={regForm.username}
                  onChange={handleRegChange}
                />
              </div>
              
              <div>
                <label htmlFor="reg-password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="reg-password"
                  name="password"
                  type="password"
                  required
                  className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Password"
                  value={regForm.password}
                  onChange={handleRegChange}
                />
                <p className="mt-1 text-xs text-gray-500">
                  Must contain uppercase, lowercase, number, and special character (@, #, or !)
                </p>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Register
              </button>
            </div>
          </form>
        )}

        {mode === 'forgot' && (
          <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
            <div className="space-y-4">
              <div>
                <label htmlFor="reset-username" className="block text-sm font-medium text-gray-700">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="reset-username"
                    name="username"
                    type="text"
                    required
                    className="appearance-none rounded-md relative block w-full pl-10 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Username"
                    value={resetForm.username}
                    onChange={handleResetChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="reset-voterId" className="block text-sm font-medium text-gray-700">
                  Voter ID (format: ABC1234567)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyRound className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="reset-voterId"
                    name="voterId"
                    type="text"
                    required
                    className="appearance-none rounded-md relative block w-full pl-10 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="ABC1234567"
                    value={resetForm.voterId}
                    onChange={handleResetChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="reset-newPassword" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="reset-newPassword"
                    name="newPassword"
                    type="password"
                    required
                    className="appearance-none rounded-md relative block w-full pl-10 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="New Password"
                    value={resetForm.newPassword}
                    onChange={handleResetChange}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Must contain uppercase, lowercase, number, and special character (@, #, or !)
                </p>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Reset Password
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Auth;