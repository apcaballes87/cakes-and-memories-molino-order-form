
import React from 'react';

const MapPlaceholder = (): React.JSX.Element => {
    return (
        <div className="w-full h-[200px] rounded-2xl bg-gray-200 flex items-center justify-center border border-gray-300 mb-4">
            <div className="text-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto h-8 w-8 text-gray-400 mb-2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <p className="text-sm font-medium">Map Preview Appears Here</p>
                <p className="text-xs">Enter address to update map</p>
            </div>
        </div>
    );
};

export default MapPlaceholder;
