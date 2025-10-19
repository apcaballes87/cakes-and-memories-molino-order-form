import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase, uploadFile } from '../services/supabaseClient';
import type { OrderFormData } from '../types';
import { Header } from '../components/Header';
import { FormSection } from '../components/FormSection';
import { MapPlaceholder } from '../components/MapPlaceholder';
import { Plus, Trash2, LoaderCircle } from 'lucide-react';

const OrderForm = (): React.JSX.Element => {
  const { subscriberId, numProducts } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<{ [key: number]: string }>({});
  const [paymentPreview, setPaymentPreview] = useState<string | null>(null);

  // Add debugging for environment variables
  useEffect(() => {
    console.log('Checking Supabase client configuration:');
    console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
    console.log('Supabase Key present:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
  }, []);

  const { 
    control,
    register, 
    handleSubmit, 
    watch, 
    setValue, 
    formState: { errors } 
  } = useForm<OrderFormData>({
    defaultValues: {
      customerName: '',
      contactNumber: '',
      email: '',
      cakes: Array(numProducts ? parseInt(numProducts) : 1).fill({
        size: '',
        shape: '',
        flavor: '',
        filling: '',
        design: '',
        message: '',
        referenceImage: undefined
      }),
      deliveryOption: 'pickup',
      deliveryDate: '',
      deliveryAddress: '',
      specialInstructions: '',
      paymentMethod: 'cash',
      agreeToTerms: false,
      agreeToRefundPolicy: false,
      paymentPreview: undefined
    }
  });

  const { fields, append, remove } = useFieldArray({
    name: 'cakes',
    control: control
  });

  const onSubmit = async (data: OrderFormData) => {
    setIsSubmitting(true);
    try {
      console.log('Submitting order with data:', data);
      
      // Check if environment variables are available
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        throw new Error('Missing Supabase configuration. Please check environment variables.');
      }

      // Success
      alert('Order submitted successfully!');
      setTimeout(() => {
        navigate('/thank-you');
      }, 2000);
    } catch (error) {
      console.error('Submission failed. Full error:', error);
      let message = 'An unknown error occurred. Please try again.';
      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === 'object' && error !== null && 'message' in error) {
        message = String((error as any).message);
      } else if (typeof error === 'string') {
        message = error;
      }
      alert(`Error submitting order: ${message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-lightBg">
      <Header />
      
      <main className="container mx-auto px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Cake Order Form</h1>
            <p className="text-grayText">Fill out the form below to place your order. All fields marked with * are required.</p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormSection title="Customer Information">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
                <input
                  type="text"
                  {...register('customerName', { required: 'Customer name is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.customerName && <p className="text-red-500 text-sm mt-1">{errors.customerName.message}</p>}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number *</label>
                <input
                  type="tel"
                  {...register('contactNumber', { required: 'Contact number is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.contactNumber && <p className="text-red-500 text-sm mt-1">{errors.contactNumber.message}</p>}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
                <input
                  type="email"
                  {...register('email')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
            </FormSection>
            
            <FormSection title="Cake Details">
              {fields.map((field, index) => (
                <div key={field.id} className="border border-gray-200 rounded-lg p-4 mb-4 relative">
                  <div 
                    className="absolute top-2 right-2 cursor-pointer" 
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </div>
                  
                  <h3 className="text-lg font-medium text-primary mb-3">Cake {index + 1}</h3>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Size *</label>
                    <select
                      {...register(`cakes.${index}.size`, { required: 'Size is required' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select Size</option>
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
                    {errors.cakes?.[index]?.size && <p className="text-red-500 text-sm mt-1">{errors.cakes[index]?.size?.message}</p>}
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Shape *</label>
                    <select
                      {...register(`cakes.${index}.shape`, { required: 'Shape is required' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select Shape</option>
                      <option value="round">Round</option>
                      <option value="square">Square</option>
                      <option value="heart">Heart</option>
                    </select>
                    {errors.cakes?.[index]?.shape && <p className="text-red-500 text-sm mt-1">{errors.cakes[index]?.shape?.message}</p>}
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Flavor *</label>
                    <select
                      {...register(`cakes.${index}.flavor`, { required: 'Flavor is required' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select Flavor</option>
                      <option value="vanilla">Vanilla</option>
                      <option value="chocolate">Chocolate</option>
                      <option value="red-velvet">Red Velvet</option>
                    </select>
                    {errors.cakes?.[index]?.flavor && <p className="text-red-500 text-sm mt-1">{errors.cakes[index]?.flavor?.message}</p>}
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Filling *</label>
                    <select
                      {...register(`cakes.${index}.filling`, { required: 'Filling is required' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select Filling</option>
                      <option value="vanilla">Vanilla</option>
                      <option value="chocolate">Chocolate</option>
                      <option value="strawberry">Strawberry</option>
                    </select>
                    {errors.cakes?.[index]?.filling && <p className="text-red-500 text-sm mt-1">{errors.cakes[index]?.filling?.message}</p>}
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Design *</label>
                    <select
                      {...register(`cakes.${index}.design`, { required: 'Design is required' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select Design</option>
                      <option value="plain">Plain</option>
                      <option value="buttercream">Buttercream</option>
                      <option value="fondant">Fondant</option>
                    </select>
                    {errors.cakes?.[index]?.design && <p className="text-red-500 text-sm mt-1">{errors.cakes[index]?.design?.message}</p>}
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
                    <input
                      type="text"
                      {...register(`cakes.${index}.message`)}
                      placeholder="Enter any special message"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  <Controller
                    name={`cakes.${index}.referenceImage`}
                    control={control}
                    render={({ field }) => (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Reference Image (Optional)</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            field.onChange(e);
                            if (e.target.files && e.target.files[0]) {
                              const reader = new FileReader();
                              reader.onload = () => {
                                setImagePreviews(prev => ({ ...prev, [index]: reader.result as string }));
                              };
                              reader.readAsDataURL(e.target.files[0]);
                            }
                          }}
                          className="border border-gray-300 rounded-md p-2 w-full"
                        />
                        {imagePreviews[index] && (
                          <img
                            src={imagePreviews[index]}
                            alt={`Cake ${index + 1}`}
                            className="mt-2 w-full h-48 object-cover rounded-lg"
                          />
                        )}
                      </div>
                    )}
                  />
                </div>
              ))}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => append({
                    size: '',
                    shape: '',
                    flavor: '',
                    filling: '',
                    design: '',
                    message: '',
                    referenceImage: undefined
                  })}
                  className="px-4 py-2 bg-primary text-white font-semibold rounded-full shadow-md hover:bg-primaryLight focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Another Cake
                </button>
              </div>
            </FormSection>
            
            <FormSection title="Delivery Information">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Option *</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      {...register('deliveryOption')}
                      value="pickup"
                      className="text-primary focus:ring-primary"
                    />
                    <span className="ml-2 text-grayText">Pickup</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      {...register('deliveryOption')}
                      value="delivery"
                      className="text-primary focus:ring-primary"
                    />
                    <span className="ml-2 text-grayText">Delivery</span>
                  </label>
                </div>
                {errors.deliveryOption && <p className="text-red-500 text-sm mt-1">{errors.deliveryOption.message}</p>}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Date *</label>
                <input
                  type="date"
                  {...register('deliveryDate', { required: 'Delivery date is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.deliveryDate && <p className="text-red-500 text-sm mt-1">{errors.deliveryDate.message}</p>}
              </div>
              
              <Controller
                name="deliveryAddress"
                control={control}
                render={({ field }) => (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address</label>
                    <textarea
                      placeholder="Enter your delivery address"
                      value={field.value || ''}
                      onChange={field.onChange}
                      disabled={watch('deliveryOption') === 'pickup'}
                      className="border border-gray-300 rounded-md p-2 w-full"
                    />
                    {watch('deliveryOption') === 'delivery' && <MapPlaceholder />}
                  </div>
                )}
              />
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions (Optional)</label>
                <textarea
                  {...register('specialInstructions')}
                  placeholder="Enter any special instructions"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </FormSection>
            
            <FormSection title="Payment Information">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method *</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      {...register('paymentMethod')}
                      value="cash"
                      className="text-primary focus:ring-primary"
                    />
                    <span className="ml-2 text-grayText">Cash</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      {...register('paymentMethod')}
                      value="card"
                      className="text-primary focus:ring-primary"
                    />
                    <span className="ml-2 text-grayText">Card</span>
                  </label>
                </div>
                {errors.paymentMethod && <p className="text-red-500 text-sm mt-1">{errors.paymentMethod.message}</p>}
              </div>
              
              <Controller
                name="paymentPreview"
                control={control}
                render={({ field }) => (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Preview (Optional)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        field.onChange(e);
                        if (e.target.files && e.target.files[0]) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            setPaymentPreview(reader.result as string);
                          };
                          reader.readAsDataURL(e.target.files[0]);
                        }
                      }}
                      className="border border-gray-300 rounded-md p-2 w-full"
                    />
                    {paymentPreview && (
                      <img
                        src={paymentPreview}
                        alt="Payment Preview"
                        className="mt-2 w-full h-48 object-cover rounded-lg"
                      />
                    )}
                  </div>
                )}
              />
            </FormSection>
            
            <FormSection title="Terms and Conditions">
              <div className="mb-4">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    {...register('agreeToTerms', { required: 'You must agree to the terms and conditions' })}
                    className="mt-1 text-primary focus:ring-primary"
                  />
                  <span className="ml-2 text-sm text-grayText">
                    I agree to the terms and conditions
                  </span>
                </label>
                {errors.agreeToTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms.message}</p>}
              </div>
              
              <div className="mb-4">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    {...register('agreeToRefundPolicy', { required: 'You must agree to the refund policy' })}
                    className="mt-1 text-primary focus:ring-primary"
                  />
                  <span className="ml-2 text-sm text-grayText">
                    I agree to the refund policy
                  </span>
                </label>
                {errors.agreeToRefundPolicy && <p className="text-red-500 text-sm mt-1">{errors.agreeToRefundPolicy.message}</p>}
              </div>
            </FormSection>
            
            {/* Submit Button */}
            <div className="text-center pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 bg-primary text-white font-semibold rounded-full shadow-md hover:bg-primaryLight focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? <LoaderCircle className="w-4 h-4 animate-spin" /> : 'Submit Order'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default OrderForm;