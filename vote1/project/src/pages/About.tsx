import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Shield, Globe, Zap } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Mission</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-blue-100">
            Empowering democracy through secure, transparent, and accessible online voting solutions.
          </p>
        </div>
      </section>
      
      {/* About Us Section */}
      <section className="section">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">About VoteSecure</h2>
            <p className="text-gray-700 mb-4">
              Founded in 2022, VoteSecure was born from a simple yet powerful idea: 
              that voting should be accessible to everyone, regardless of physical location, 
              mobility challenges, or time constraints.
            </p>
            <p className="text-gray-700 mb-4">
              Our team of security experts, democracy advocates, and UX specialists came together 
              to create a platform that combines military-grade security with intuitive design, 
              ensuring that online voting is not just possible—but preferable.
            </p>
            <p className="text-gray-700 mb-6">
              Today, we serve thousands of organizations worldwide, from student governments to 
              professional associations, nonprofit boards to community organizations, helping them 
              conduct fair and transparent elections with increased participation.
            </p>
            <div className="flex gap-4">
              <Link to="/contact" className="btn btn-primary">
                Contact Us
              </Link>
              <Link to="/login" className="btn btn-secondary">
                Get Started
              </Link>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img 
              src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Team collaboration" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>
      
      {/* Core Values Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide every decision we make and feature we develop.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md flex">
              <div className="mr-4">
                <Shield className="h-10 w-10 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Security First</h3>
                <p className="text-gray-600">
                  We implement the highest security standards, using end-to-end encryption, 
                  multi-factor authentication, and regular security audits to protect every vote.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex">
              <div className="mr-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Absolute Transparency</h3>
                <p className="text-gray-600">
                  Our open processes and audit trails ensure that every election is verifiable 
                  and trustworthy, without compromising voter privacy.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex">
              <div className="mr-4">
                <Globe className="h-10 w-10 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Universal Accessibility</h3>
                <p className="text-gray-600">
                  We design with everyone in mind, ensuring our platform works for people of all 
                  abilities, technical backgrounds, and device preferences.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex">
              <div className="mr-4">
                <Zap className="h-10 w-10 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Continuous Innovation</h3>
                <p className="text-gray-600">
                  We constantly evolve our technology to stay ahead of emerging security threats 
                  and incorporate new advances in usability and accessibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Us in Transforming Democracy</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Ready to experience the future of voting? Create an account today and see how
            VoteSecure can make your next election more secure, accessible, and engaging.
          </p>
          <Link 
            to="/login" 
            className="btn px-8 py-3 bg-white text-blue-600 hover:bg-blue-50 rounded-lg font-semibold text-lg"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;