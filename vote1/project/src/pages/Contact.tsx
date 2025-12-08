import React from 'react';
import ContactForm from '../components/ContactForm';
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-blue-100">
            Have questions or need assistance? We're here to help!
          </p>
        </div>
      </section>
      
      {/* Contact Info & Form Section */}
      <section className="section py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Get in Touch</h2>
            <p className="text-gray-600 mb-8">
              Whether you have questions about our platform, need technical support, 
              or want to learn more about how we can help your organization, our team is ready to assist you.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="mt-1">
                  <MapPin className="h-6 w-6 text-blue-600 mr-4" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Our Office</h3>
                  <address className="not-italic text-gray-600 mt-1">
                    123 Democracy Avenue<br />
                    Suite 500<br />
                    Boston, MA 02108<br />
                    United States
                  </address>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mt-1">
                  <Phone className="h-6 w-6 text-blue-600 mr-4" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Phone</h3>
                  <p className="text-gray-600 mt-1">
                    <a href="tel:+15551234567" className="hover:text-blue-600 transition-colors">+1 (555) 123-4567</a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mt-1">
                  <Mail className="h-6 w-6 text-blue-600 mr-4" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Email</h3>
                  <p className="text-gray-600 mt-1">
                    <a href="mailto:info@votesecure.com" className="hover:text-blue-600 transition-colors">info@votesecure.com</a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mt-1">
                  <Clock className="h-6 w-6 text-blue-600 mr-4" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Operating Hours</h3>
                  <p className="text-gray-600 mt-1">
                    Monday - Friday: 9:00 AM - 5:00 PM EST<br />
                    Saturday - Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="font-medium text-gray-900 mb-3">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <ContactForm />
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Our Location</h2>
            <p className="text-gray-600 mt-2">Visit our office in downtown Boston</p>
          </div>
          
          <div className="bg-white p-2 rounded-lg shadow-md">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2948.2399275853764!2d-71.0700287!3d42.35804400000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e3709d167d4ef5%3A0x9cac3f540a9f45cb!2sBoston%2C%20MA%2002108!5e0!3m2!1sen!2sus!4v1697556834344!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="section py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find quick answers to common questions about our platform.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Is online voting secure?</h3>
            <p className="text-gray-600">
              Yes, VoteSecure uses end-to-end encryption, multi-factor authentication, and advanced 
              security protocols to ensure that every vote is secure and tamper-proof.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">How do you verify voter identity?</h3>
            <p className="text-gray-600">
              We offer multiple verification methods including government ID verification, email 
              verification, and custom verification processes tailored to your organization's needs.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Can VoteSecure handle large elections?</h3>
            <p className="text-gray-600">
              Absolutely. Our platform is built to scale and has successfully managed elections with 
              hundreds of thousands of voters without any performance issues.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">What kind of support do you offer?</h3>
            <p className="text-gray-600">
              We provide comprehensive support including setup assistance, voter support during 
              elections, and technical troubleshooting. Our team is available via email, phone, 
              and live chat during business hours.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;