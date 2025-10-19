import { CakeOrderData } from "../types";

/**
 * Formats a date string to a more readable format
 */
export const formatDeliveryDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

/**
 * Validates the order submission data
 */
export const validateOrderSubmission = (data: CakeOrderData): string | null => {
  // Check if at least one cake is specified
  if (!data.cakes || data.cakes.length === 0) {
    return 'At least one cake must be specified';
  }
  
  // Validate each cake
  for (let i = 0; i < data.cakes.length; i++) {
    const cake = data.cakes[i];
    
    if (!cake.size) {
      return `Cake ${i + 1}: Size is required`;
    }
    
    if (!cake.shape) {
      return `Cake ${i + 1}: Shape is required`;
    }
    
    if (!cake.flavor) {
      return `Cake ${i + 1}: Flavor is required`;
    }
    
    if (!cake.filling) {
      return `Cake ${i + 1}: Filling is required`;
    }
    
    if (!cake.design) {
      return `Cake ${i + 1}: Design is required`;
    }
  }
  
  // Validate delivery date (must be at least 2 days in the future)
  const deliveryDate = new Date(data.deliveryDate);
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 2);
  
  if (deliveryDate < minDate) {
    return 'Delivery date must be at least 2 days in the future';
  }
  
  // If delivery is selected, address is required
  if (data.deliveryOption === 'delivery' && !data.deliveryAddress.trim()) {
    return 'Delivery address is required for delivery option';
  }
  
  // Terms and conditions must be agreed to
  if (!data.agreeToTerms) {
    return 'You must agree to the terms and conditions';
  }
  
  // Refund policy must be agreed to
  if (!data.agreeToRefundPolicy) {
    return 'You must agree to the refund policy';
  }
  
  return null; // No validation errors
};