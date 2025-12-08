import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import { CheckCircle, Users, ShieldCheck, Globe, Vote, UserCheck, ClipboardCheck } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="page-transition">
      <Hero />
      
      {/* How to Vote Section */}
      <section className="section">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How to Cast Your Vote</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Follow these simple steps to participate in the voting process securely.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <div className="flex items-start bg-white p-6 rounded-lg shadow-md">
              <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full mr-6">
                <UserCheck className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">1. Create Your Account</h3>
                <p className="text-gray-600 mb-2">Register with your:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Full Name</li>
                  <li>Date of Birth</li>
                  <li>Phone Number</li>
                  <li>Voter ID (Format: ABC1234567)</li>
                  <li>Username and Password</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start bg-white p-6 rounded-lg shadow-md">
              <div className="flex-shrink-0 bg-green-100 p-3 rounded-full mr-6">
                <ShieldCheck className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">2. Log In Securely</h3>
                <p className="text-gray-600">
                  Access your account using your username and password. Our secure login system 
                  ensures that only authorized voters can participate in the election.
                </p>
              </div>
            </div>

            <div className="flex items-start bg-white p-6 rounded-lg shadow-md">
              <div className="flex-shrink-0 bg-purple-100 p-3 rounded-full mr-6">
                <Vote className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">3. Select Your Candidate</h3>
                <p className="text-gray-600">
                  View all available candidates and their information. Click the "Vote" button 
                  next to your chosen candidate. You can change your vote before final submission.
                </p>
              </div>
            </div>

            <div className="flex items-start bg-white p-6 rounded-lg shadow-md">
              <div className="flex-shrink-0 bg-yellow-100 p-3 rounded-full mr-6">
                <ClipboardCheck className="h-8 w-8 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">4. Confirm Your Vote</h3>
                <p className="text-gray-600">
                  Review your selection and confirm your vote. Once confirmed, your vote is 
                  securely recorded and cannot be changed. You can view real-time results 
                  after voting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="section bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How VoteSecure Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform makes online voting simple, secure, and accessible for everyone.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mb-4">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Register</h3>
            <p className="text-gray-600">
              Create your secure account with voter verification.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-green-100 text-green-600 rounded-full mb-4">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Verify</h3>
            <p className="text-gray-600">
              Confirm your identity using our secure verification system.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full mb-4">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Vote</h3>
            <p className="text-gray-600">
              Cast your vote securely from anywhere, anytime.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-yellow-100 text-yellow-600 rounded-full mb-4">
              <Globe className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Results</h3>
            <p className="text-gray-600">
              View transparent, real-time results and analytics.
            </p>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from organizations and individuals who have used VoteSecure for their elections.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "VoteSecure transformed our student government elections. The platform is intuitive, secure, and increased voter turnout by 45%!"
              </p>
              <div className="mt-4">
                <p className="font-medium">Sarah Johnson</p>
                <p className="text-sm text-gray-500">University Student Union President</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "As a nonprofit organization, we needed a cost-effective and accessible voting solution. VoteSecure delivered on all fronts with exceptional security."
              </p>
              <div className="mt-4">
                <p className="font-medium">Michael Chen</p>
                <p className="text-sm text-gray-500">Community Foundation Director</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "The real-time analytics and transparent voting process gave our members confidence in the election results. Highly recommended!"
              </p>
              <div className="mt-4">
                <p className="font-medium">Jessica Rodriguez</p>
                <p className="text-sm text-gray-500">Association Board Member</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your voting process?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of organizations that trust VoteSecure for their democratic processes.
            Experience secure, transparent, and accessible voting today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/login" 
              className="btn px-8 py-3 bg-white text-blue-600 hover:bg-blue-50 rounded-lg font-semibold text-lg"
            >
              Get Started
            </Link>
            <Link
              to="/contact"
              className="btn px-8 py-3 bg-transparent border-2 border-white hover:bg-white/10 rounded-lg font-semibold text-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;