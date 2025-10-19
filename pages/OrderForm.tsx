import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { CakeOrderData } from '../types';
import { Header } from '../components/Header';
import { FormElements } from '../components/FormElements';
import { supabase, uploadFile } from '../services/supabaseClient';
import { formatDeliveryDate, validateOrderSubmission } from '../utils/helpers';

export default function OrderForm() {
  const { subscriberId, numProducts } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const cakeCount = numProducts ? parseInt(numProducts) : 1;
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<CakeOrderData>({
    defaultValues: {
      cakes: Array(cakeCount).fill({
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
      agreeToRefundPolicy: false
    }
  });
  
  const navigate = useNavigate();
  
  // Set minimum delivery date (2 days from today)
  useEffect(() => {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 2);
    setValue('deliveryDate', minDate.toISOString().split('T')[0]);
  }, [setValue]);
  
  const onSubmit: SubmitHandler<CakeOrderData> = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Validate the order submission
      const validationError = validateOrderSubmission(data);
      if (validationError) {
        throw new Error(validationError);
      }
      
      // Upload reference images if provided
      const uploadedImageUrls: (string | null)[] = [];
      for (let i = 0; i < data.cakes.length; i++) {
        const file = data.cakes[i].referenceImage?.[0];
        if (file) {
          const url = await uploadFile(file);
          uploadedImageUrls.push(url);
        } else {
          uploadedImageUrls.push(null);
        }
      }
      
      // Format delivery date
      const formattedDeliveryDate = formatDeliveryDate(data.deliveryDate);
      
      // Prepare data for Supabase
      const orderData = {
        customer_name: data.customerName,
        contact_number: data.contactNumber,
        email: data.email || null,
        cakes: data.cakes.map((cake, index) => ({
          size: cake.size,
          shape: cake.shape,
          flavor: cake.flavor,
          filling: cake.filling,
          design: cake.design,
          message: cake.message || null,
          reference_image: uploadedImageUrls[index]
        })),
        delivery_option: data.deliveryOption,
        delivery_date: formattedDeliveryDate,
        delivery_address: data.deliveryOption === 'delivery' ? data.deliveryAddress : null,
        special_instructions: data.specialInstructions || null,
        payment_method: data.paymentMethod,
        total_amount: data.cakes.reduce((total, cake) => total + 500, 0) + (data.deliveryOption === 'delivery' ? 100 : 0), // Simplified calculation
        subscriber_id: subscriberId || 'default-user',
        status: 'pending'
      };
      
      // Insert order into Supabase
      const { error } = await supabase
        .from('orders')
        .insert([orderData]);
      
      if (error) throw error;
      
      // Success
      setSubmitSuccess(true);
      setTimeout(() => {
        navigate('/thank-you');
      }, 2000);
    } catch (error) {
      console.error('Error submitting order:', error);
      setSubmitError(error.message || 'Failed to submit order. Please try again.');
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
          
          {submitSuccess ? (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-primary mb-2">Order Submitted Successfully!</h2>
              <p className="text-grayText mb-4">Thank you for your order. We'll contact you shortly to confirm the details.</p>
              <p className="text-sm text-grayText">Redirecting to confirmation page...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <FormElements 
                register={register}
                setValue={setValue}
                watch={watch}
                errors={errors}
                cakeCount={cakeCount}
              />
              
              {/* Submit Button */}
              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-3 bg-primary text-white font-semibold rounded-full shadow-md hover:bg-primaryLight focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Submitting Order...' : 'Submit Order'}
                </button>
                
                {submitError && (
                  <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md max-w-md mx-auto">
                    {submitError}
                  </div>
                )}
                
                <p className="text-xs text-grayText mt-4 max-w-md mx-auto">
                  By submitting this order, you agree to our terms and conditions. 
                  Our team will contact you within 24 hours to confirm your order.
                </p>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}