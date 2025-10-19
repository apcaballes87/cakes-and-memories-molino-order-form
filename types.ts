export interface CakeSize {
  id: string;
  name: string;
  price: number;
}

export interface CakeFlavor {
  id: string;
  name: string;
  price: number;
}

export interface CakeFilling {
  id: string;
  name: string;
  price: number;
}

export interface CakeDesign {
  id: string;
  name: string;
  price: number;
}

export interface CakeShape {
  id: string;
  name: string;
  price: number;
}

export interface CakeDetails {
  size: string;
  shape: string;
  flavor: string;
  filling: string;
  design: string;
  message?: string;
  referenceImage?: FileList;
}

export interface CakeOrderData {
  customerName: string;
  contactNumber: string;
  email?: string;
  cakes: CakeDetails[];
  deliveryOption: 'pickup' | 'delivery';
  deliveryDate: string;
  deliveryAddress?: string;
  specialInstructions?: string;
  paymentMethod: 'cash' | 'gcash' | 'bank-transfer';
  agreeToTerms: boolean;
  agreeToRefundPolicy: boolean;
}