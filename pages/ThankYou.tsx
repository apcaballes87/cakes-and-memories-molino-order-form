import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-lightBg">
      <Header />
      
      <main className="container mx-auto px-4 pb-8">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
          <div className="text-primary mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-primary mb-4">Thank You for Your Order!</h1>
          
          <p className="text-grayText mb-6">
            We've received your order and our team will contact you within 24 hours to confirm the details.
          </p>
          
          <div className="bg-primaryLight p-4 rounded-xl mb-6">
            <h2 className="font-semibold text-primary mb-2">What happens next?</h2>
            <ul className="text-left text-grayText text-sm space-y-2 max-w-md mx-auto">
              <li className="flex items-start">
                <span className="text-primary mr-2">1.</span>
                <span>We'll review your order and send a confirmation message</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">2.</span>
                <span>You'll receive payment instructions based on your selected method</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">3.</span>
                <span>Once payment is confirmed, we'll begin preparing your cake</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">4.</span>
                <span>We'll contact you again before delivery/pickup</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <p className="text-grayText">
              If you have any questions, please contact us at:
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <div>
                <p className="font-semibold text-primary">0917 123 4567</p>
                <p className="text-sm text-grayText">Call or Text</p>
              </div>
              <div>
                <p className="font-semibold text-primary">cakesandmemories@example.com</p>
                <p className="text-sm text-grayText">Email</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <Link 
              to="/order/default-user/1" 
              className="inline-block px-6 py-2 bg-primary text-white font-medium rounded-full hover:bg-primaryLight transition-colors"
            >
              Place Another Order
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}