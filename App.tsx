import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import OrderForm from './pages/OrderForm';
import ThankYou from './pages/ThankYou';

function App(): React.JSX.Element {
  // Log environment variables for debugging
  React.useEffect(() => {
    console.log('Environment variables:');
    console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL);
    console.log('VITE_SUPABASE_ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Present' : 'Missing');
    console.log('NODE_ENV:', import.meta.env.NODE_ENV);
    console.log('MODE:', import.meta.env.MODE);
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/order/:subscriberId/:numProducts" element={<OrderForm />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/" element={<Navigate to="/order/default-user/1" />} />
      </Routes>
      {import.meta.env.DEV && (
        <div className="fixed bottom-0 left-0 right-0 bg-yellow-100 border-t border-yellow-400 p-4 text-sm z-50">
          <h3 className="font-bold text-yellow-800">Debug Info (Development Only)</h3>
          <p>VITE_SUPABASE_URL: {import.meta.env.VITE_SUPABASE_URL ? 'Loaded' : 'Not Loaded'}</p>
          <p>VITE_SUPABASE_ANON_KEY: {import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Loaded' : 'Not Loaded'}</p>
          <p>Environment: {import.meta.env.MODE}</p>
        </div>
      )}
    </HashRouter>
  );
}

export default App;