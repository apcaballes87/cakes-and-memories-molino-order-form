import React from 'react';

const DebugInfo = () => {
  // Only show debug info in development
  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-yellow-100 border-t border-yellow-400 p-4 text-sm">
      <h3 className="font-bold text-yellow-800">Debug Info (Development Only)</h3>
      <p>VITE_SUPABASE_URL: {import.meta.env.VITE_SUPABASE_URL ? 'Loaded' : 'Not Loaded'}</p>
      <p>VITE_SUPABASE_ANON_KEY: {import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Loaded' : 'Not Loaded'}</p>
      <p>Environment: {import.meta.env.MODE}</p>
    </div>
  );
};

export default DebugInfo;