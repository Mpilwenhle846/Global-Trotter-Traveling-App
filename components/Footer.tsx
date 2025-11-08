
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-dark-surface border-t border-gray-200 dark:border-dark-border">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-500 dark:text-dark-text-secondary text-sm">
          This is a demo app for portfolio purposes. No real bookings or payments are processed.
        </p>
        <p className="text-gray-500 dark:text-dark-text-secondary text-sm mt-2">
          &copy; {new Date().getFullYear()} Global Trotter. All rights reserved.
        </p>
      </div>
    </footer>
  );
};