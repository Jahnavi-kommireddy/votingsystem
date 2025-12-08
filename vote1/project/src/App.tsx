import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import Voting from './pages/Voting';
import { AuthProvider } from './context/AuthContext';
import { ElectionProvider } from './context/ElectionContext';
import { VoteProvider } from './context/VoteContext'; // <-- Import VoteProvider
import './App.css';

function App() {
  return (
    <AuthProvider>
      <ElectionProvider>
        <VoteProvider> {/* <-- Wrap your app with VoteProvider */}
          <Router>
            <div className="flex flex-col min-h-screen bg-gray-50">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Auth />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/voting" element={<Voting />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </VoteProvider>
      </ElectionProvider>
    </AuthProvider>
  );
}

export default App;