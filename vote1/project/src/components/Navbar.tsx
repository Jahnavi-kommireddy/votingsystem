import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Vote, User, LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [walletAccount, setWalletAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false); // <-- Add this line

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const connectWallet = async () => {
    if (isConnecting) return; // Prevent multiple requests
    setIsConnecting(true);
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAccount(accounts[0]);
        setIsConnecting(false);
        navigate('/voting');
      } catch (err) {
        setIsConnecting(false);
        alert("Wallet connection failed.");
        console.error(err);
      }
    } else {
      setIsConnecting(false);
      alert("Please install MetaMask!");
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={closeMenu}>
              <Vote className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">VoteSecure</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/" className="px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">
              Home
            </Link>
            <Link to="/about" className="px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">
              About
            </Link>
            <Link to="/contact" className="px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">
              Contact
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">
                  Dashboard
                </Link>
                <div className="ml-4 flex items-center">
                  <span className="text-sm font-medium text-gray-700 mr-2">
                    Hi, {currentUser?.name}
                  </span>
                  <button 
                    onClick={handleLogout}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link 
                to="/login" 
                className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <User className="h-4 w-4 mr-1" />
                Login
              </Link>
            )}

            {/* MetaMask Connect Button (Desktop) */}
            {walletAccount ? (
              <span className="ml-4 text-green-600 font-mono text-xs">
                {walletAccount.slice(0, 6)}...{walletAccount.slice(-4)}
              </span>
            ) : (
              <button
                onClick={connectWallet}
                disabled={isConnecting}
                className="ml-4 px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50"
              >
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden mobile-menu-open">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={closeMenu}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={closeMenu}
            >
              Contact
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
                <div className="px-3 py-2">
                  <span className="block text-sm font-medium text-gray-700 mb-2">
                    Logged in as {currentUser?.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="block w-full text-center px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                onClick={closeMenu}
              >
                Login
              </Link>
            )}

            {/* MetaMask Connect Button (Mobile) */}
            {walletAccount ? (
              <span className="block mt-2 text-green-600 font-mono text-xs text-center">
                {walletAccount.slice(0, 6)}...{walletAccount.slice(-4)}
              </span>
            ) : (
              <button
                onClick={connectWallet}
                disabled={isConnecting}
                className="block w-full mt-2 px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50"
              >
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;