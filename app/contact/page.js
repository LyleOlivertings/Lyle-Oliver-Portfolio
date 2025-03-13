'use client';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }
  
      alert(data.message || 'Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
  
    } catch (error) {
      alert(error.message || 'Something went wrong!');
    }

  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
            <p className="text-xl text-gray-600">Let's build something amazing together</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <MapPinIcon className="h-8 w-8 text-blue-600 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Location</h3>
                  <p className="text-gray-600">
                    Cape Town, South Africa<br />
                    Available for remote work worldwide
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <EnvelopeIcon className="h-8 w-8 text-blue-600 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Email</h3>
                  <p className="text-gray-600">
                    <a href="mailto:oliverlyle29@gmail.com" className="hover:text-blue-600 transition">
                      oliverlyle29@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <PhoneIcon className="h-8 w-8 text-blue-600 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Phone</h3>
                  <p className="text-gray-600">
                    <a href="tel:+27652845981" className="hover:text-blue-600 transition">
                      +27 65 284 5981
                    </a>
                  </p>
                </div>
              </div>

              <div className="pt-8">
                <h3 className="text-xl font-semibold mb-4">Connect With Me</h3>
                <div className="flex space-x-6">
                  <a href="https://github.com/LyleOlivertings" target="_blank" rel="noopener" className="text-gray-600 hover:text-blue-600 transition">
                    <span className="sr-only">GitHub</span>
                    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                  {/* Add more social icons as needed */}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  required
                  className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}