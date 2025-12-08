import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, CheckCircle, BarChart3 } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="page-transition">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Secure Online Voting Platform
            </h1>
            <p className="text-xl md:text-2xl mb-6 text-blue-100">
              Democracy at your fingertips. Safe, transparent, and accessible voting for everyone.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/login"
                className="btn px-6 py-3 bg-white text-blue-600 hover:bg-blue-50 rounded-lg font-semibold transition-all duration-200"
              >
                Get Started
              </Link>
              <Link
                to="/about"
                className="btn px-6 py-3 bg-transparent border-2 border-white hover:bg-white/10 rounded-lg font-semibold transition-all duration-200"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute -top-8 -left-8 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute inset-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
              <div className="p-8 relative">
                <img src="https://images.pexels.com/photos/7693250/pexels-photo-7693250.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                     alt="Secure Voting" 
                     className="rounded-lg shadow-2xl relative z-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card flex flex-col items-center text-center p-6 transition-all duration-300 hover:translate-y-[-5px]">
              <Shield className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                Advanced encryption and authentication protocols ensure your vote remains secure and private.
              </p>
            </div>
            
            <div className="card flex flex-col items-center text-center p-6 transition-all duration-300 hover:translate-y-[-5px]">
              <CheckCircle className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
              <p className="text-gray-600">
                Simple and intuitive interface makes voting accessible to everyone, anytime, anywhere.
              </p>
            </div>
            
            <div className="card flex flex-col items-center text-center p-6 transition-all duration-300 hover:translate-y-[-5px]">
              <BarChart3 className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-time Results</h3>
              <p className="text-gray-600">
                View election results in real-time with detailed analytics and transparent counting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;