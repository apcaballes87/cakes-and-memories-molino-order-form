import React, { useState } from 'react';
import { UseFormRegister, UseFormSetValue, UseFormWatch, FieldErrors } from 'react-hook-form';
import { CakeOrderData } from '../types';
import { CakeSize, CakeFlavor, CakeFilling, CakeDesign, CakeShape } from '../types';
import { MapPlaceholder } from './MapPlaceholder';

interface FormElementsProps {
  register: UseFormRegister<CakeOrderData>;
  setValue: UseFormSetValue<CakeOrderData>;
  watch: UseFormWatch<CakeOrderData>;
  errors: FieldErrors<CakeOrderData>;
  cakeCount: number;
}

const cakeSizes: CakeSize[] = [
  { id: '6', name: '6" Round (Serves 6-8)', price: 450 },
  { id: '8', name: '8" Round (Serves 12-15)', price: 650 },
  { id: '9', name: '9" Round (Serves 18-20)', price: 850 },
  { id: '10', name: '10" Round (Serves 25-30)', price: 1050 },
  { id: '12', name: '12" Round (Serves 35-40)', price: 1450 },
  { id: 'half', name: 'Half Sheet (Serves 30-40)', price: 1250 },
  { id: 'full', name: 'Full Sheet (Serves 60-80)', price: 2250 },
];

const cakeFlavors: CakeFlavor[] = [
  { id: 'chocolate', name: 'Chocolate', price: 0 },
  { id: 'vanilla', name: 'Vanilla', price: 0 },
  { id: 'red-velvet', name: 'Red Velvet', price: 0 },
  { id: 'ube', name: 'Ube', price: 0 },
  { id: 'cheesecake', name: 'Cheesecake', price: 100 },
  { id: 'moist-chocolate', name: 'Moist Chocolate', price: 100 },
  { id: 'mocha', name: 'Mocha', price: 100 },
];

const cakeFillings: CakeFilling[] = [
  { id: 'buttercream', name: 'Buttercream', price: 0 },
  { id: 'chocolate-ganache', name: 'Chocolate Ganache', price: 50 },
  { id: 'ube-ganache', name: 'Ube Ganache', price: 50 },
  { id: 'fruit-compote', name: 'Fruit Compote', price: 50 },
  { id: 'leche-flan', name: 'Leche Flan', price: 100 },
  { id: 'fruit-nut', name: 'Fruit & Nut', price: 100 },
];

const cakeDesigns: CakeDesign[] = [
  { id: 'simple', name: 'Simple (Plain Icing)', price: 0 },
  { id: 'decorated', name: 'Decorated (Basic Design)', price: 200 },
  { id: 'custom', name: 'Custom Design', price: 500 },
  { id: 'photo-cake', name: 'Photo Cake', price: 300 },
];

const cakeShapes: CakeShape[] = [
  { id: 'round', name: 'Round', price: 0 },
  { id: 'square', name: 'Square', price: 0 },
  { id: 'heart', name: 'Heart', price: 100 },
  { id: 'oval', name: 'Oval', price: 100 },
];

export const FormElements: React.FC<FormElementsProps> = ({
  register,
  setValue,
  watch,
  errors,
  cakeCount,
}) => {
  const [showMap, setShowMap] = useState(false);
  
  const toggleMap = () => setShowMap(!showMap);
  
  // Watch all cake fields
  const cakes = watch('cakes');
  
  // Calculate total price
  const calculateTotalPrice = () => {
    let total = 0;
    for (let i = 0; i < cakeCount; i++) {
      const cake = cakes?.[i] || {};
      
      // Add size price
      const size = cakeSizes.find(s => s.id === cake.size);
      total += size?.price || 0;
      
      // Add flavor price
      const flavor = cakeFlavors.find(f => f.id === cake.flavor);
      total += flavor?.price || 0;
      
      // Add filling price
      const filling = cakeFillings.find(f => f.id === cake.filling);
      total += filling?.price || 0;
      
      // Add design price
      const design = cakeDesigns.find(d => d.id === cake.design);
      total += design?.price || 0;
      
      // Add shape price
      const shape = cakeShapes.find(s => s.id === cake.shape);
      total += shape?.price || 0;
    }
    
    // Add delivery fee if needed
    const deliveryOption = watch('deliveryOption');
    if (deliveryOption === 'delivery') {
      total += 100; // Delivery fee
    }
    
    return total;
  };
  
  const totalPrice = calculateTotalPrice();
  
  return (
    <>
      {/* Customer Information */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-primary">Customer Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-grayText mb-1">Full Name *</label>
            <input
              type="text"
              {...register('customerName', { required: 'Customer name is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.customerName && <p className="text-red-500 text-sm mt-1">{errors.customerName.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-grayText mb-1">Contact Number *</label>
            <input
              type="tel"
              {...register('contactNumber', { 
                required: 'Contact number is required',
                pattern: {
                  value: /^[0-9+\s-()]+$/,
                  message: 'Please enter a valid phone number'
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.contactNumber && <p className="text-red-500 text-sm mt-1">{errors.contactNumber.message}</p>}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-grayText mb-1">Email Address</label>
          <input
            type="email"
            {...register('email', {
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Please enter a valid email address'
              }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
      </div>
      
      {/* Cake Details */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-primary">Cake Details</h2>
        
        {[...Array(cakeCount)].map((_, index) => (
          <div key={index} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium text-primary mb-3">Cake {index + 1}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Size */}
              <div>
                <label className="block text-sm font-medium text-grayText mb-1">Size *</label>
                <select
                  {...register(`cakes.${index}.size`, { required: 'Cake size is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Size</option>
                  {cakeSizes.map(size => (
                    <option key={size.id} value={size.id}>
                      {size.name} - ₱{size.price}
                    </option>
                  ))}
                </select>
                {errors.cakes?.[index]?.size && <p className="text-red-500 text-sm mt-1">{errors.cakes[index]?.size?.message}</p>}
              </div>
              
              {/* Shape */}
              <div>
                <label className="block text-sm font-medium text-grayText mb-1">Shape *</label>
                <select
                  {...register(`cakes.${index}.shape`, { required: 'Cake shape is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Shape</option>
                  {cakeShapes.map(shape => (
                    <option key={shape.id} value={shape.id}>
                      {shape.name} {shape.price > 0 && `(+₱${shape.price})`}
                    </option>
                  ))}
                </select>
                {errors.cakes?.[index]?.shape && <p className="text-red-500 text-sm mt-1">{errors.cakes[index]?.shape?.message}</p>}
              </div>
              
              {/* Flavor */}
              <div>
                <label className="block text-sm font-medium text-grayText mb-1">Flavor *</label>
                <select
                  {...register(`cakes.${index}.flavor`, { required: 'Cake flavor is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Flavor</option>
                  {cakeFlavors.map(flavor => (
                    <option key={flavor.id} value={flavor.id}>
                      {flavor.name} {flavor.price > 0 && `(+₱${flavor.price})`}
                    </option>
                  ))}
                </select>
                {errors.cakes?.[index]?.flavor && <p className="text-red-500 text-sm mt-1">{errors.cakes[index]?.flavor?.message}</p>}
              </div>
              
              {/* Filling */}
              <div>
                <label className="block text-sm font-medium text-grayText mb-1">Filling *</label>
                <select
                  {...register(`cakes.${index}.filling`, { required: 'Cake filling is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Filling</option>
                  {cakeFillings.map(filling => (
                    <option key={filling.id} value={filling.id}>
                      {filling.name} {filling.price > 0 && `(+₱${filling.price})`}
                    </option>
                  ))}
                </select>
                {errors.cakes?.[index]?.filling && <p className="text-red-500 text-sm mt-1">{errors.cakes[index]?.filling?.message}</p>}
              </div>
              
              {/* Design */}
              <div>
                <label className="block text-sm font-medium text-grayText mb-1">Design *</label>
                <select
                  {...register(`cakes.${index}.design`, { required: 'Cake design is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Design</option>
                  {cakeDesigns.map(design => (
                    <option key={design.id} value={design.id}>
                      {design.name} {design.price > 0 && `(+₱${design.price})`}
                    </option>
                  ))}
                </select>
                {errors.cakes?.[index]?.design && <p className="text-red-500 text-sm mt-1">{errors.cakes[index]?.design?.message}</p>}
              </div>
              
              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-grayText mb-1">Message on Cake</label>
                <input
                  type="text"
                  {...register(`cakes.${index}.message`)}
                  placeholder="Happy Birthday Juan!"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              {/* Reference Image */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-grayText mb-1">Reference Image</label>
                <input
                  type="file"
                  {...register(`cakes.${index}.referenceImage`)}
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <p className="text-xs text-grayText mt-1">Upload a reference image for custom designs (optional)</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Delivery Information */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-primary">Delivery Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-grayText mb-1">Delivery Option *</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  {...register('deliveryOption', { required: 'Delivery option is required' })}
                  value="pickup"
                  className="text-primary focus:ring-primary"
                />
                <span className="ml-2 text-grayText">Pickup at Store (Molino Branch)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  {...register('deliveryOption', { required: 'Delivery option is required' })}
                  value="delivery"
                  className="text-primary focus:ring-primary"
                />
                <span className="ml-2 text-grayText">Delivery (₱100 fee)</span>
              </label>
            </div>
            {errors.deliveryOption && <p className="text-red-500 text-sm mt-1">{errors.deliveryOption.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-grayText mb-1">Delivery Date *</label>
            <input
              type="date"
              {...register('deliveryDate', { required: 'Delivery date is required' })}
              min={new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0]}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-xs text-grayText mt-1">Note: Orders must be placed at least 2 days in advance</p>
            {errors.deliveryDate && <p className="text-red-500 text-sm mt-1">{errors.deliveryDate.message}</p>}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-grayText mb-1">Delivery Address</label>
          <textarea
            {...register('deliveryAddress')}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Full delivery address including barangay, city, and landmarks"
          />
          <div className="flex justify-end mt-2">
            <button
              type="button"
              onClick={toggleMap}
              className="text-sm text-primary hover:underline"
            >
              {showMap ? 'Hide Map' : 'Show Map Reference'}
            </button>
          </div>
          {showMap && (
            <div className="mt-4">
              <MapPlaceholder />
            </div>
          )}
        </div>
      </div>
      
      {/* Special Instructions */}
      <div>
        <label className="block text-sm font-medium text-grayText mb-1">Special Instructions</label>
        <textarea
          {...register('specialInstructions')}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Any additional requests or special instructions for your order"
        />
      </div>
      
      {/* Payment Method */}
      <div>
        <label className="block text-sm font-medium text-grayText mb-1">Payment Method *</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              {...register('paymentMethod', { required: 'Payment method is required' })}
              value="cash"
              className="text-primary focus:ring-primary"
            />
            <span className="ml-2 text-grayText">Cash on Delivery/Pickup</span>
          </label>
          <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              {...register('paymentMethod', { required: 'Payment method is required' })}
              value="gcash"
              className="text-primary focus:ring-primary"
            />
            <span className="ml-2 text-grayText">GCash Payment</span>
          </label>
          <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              {...register('paymentMethod', { required: 'Payment method is required' })}
              value="bank-transfer"
              className="text-primary focus:ring-primary"
            />
            <span className="ml-2 text-grayText">Bank Transfer</span>
          </label>
        </div>
        {errors.paymentMethod && <p className="text-red-500 text-sm mt-1">{errors.paymentMethod.message}</p>}
      </div>
      
      {/* Total Price */}
      <div className="bg-primaryLight p-4 rounded-2xl text-center">
        <p className="text-lg font-semibold text-primary">Total Price: ₱{totalPrice}</p>
        <p className="text-sm text-grayText mt-1">This price includes all selected options</p>
      </div>
      
      {/* Terms and Conditions */}
      <div className="space-y-2">
        <label className="flex items-start">
          <input
            type="checkbox"
            {...register('agreeToTerms', { required: 'You must agree to the terms and conditions' })}
            className="mt-1 text-primary focus:ring-primary"
          />
          <span className="ml-2 text-sm text-grayText">
            I agree to the <a href="#" className="text-primary hover:underline">terms and conditions</a> and acknowledge that orders must be placed at least 2 days in advance.
          </span>
        </label>
        {errors.agreeToTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms.message}</p>}
        
        <label className="flex items-start">
          <input
            type="checkbox"
            {...register('agreeToRefundPolicy', { required: 'You must agree to the refund policy' })}
            className="mt-1 text-primary focus:ring-primary"
          />
          <span className="ml-2 text-sm text-grayText">
            I agree to the <a href="#" className="text-primary hover:underline">refund policy</a> and understand that cancellations must be made at least 24 hours before the scheduled delivery/pickup.
          </span>
        </label>
        {errors.agreeToRefundPolicy && <p className="text-red-500 text-sm mt-1">{errors.agreeToRefundPolicy.message}</p>}
      </div>
    </>
  );
};