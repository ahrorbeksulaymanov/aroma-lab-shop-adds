export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  features: string[];
  isNew?: boolean;
  inStock: boolean;
  warranty: string;
  delivery: string;
  installmentOptions: {
    months: number;
    monthlyPayment: number;
  }[];
}

export interface CheckoutFormData {
  phoneNumber: string;
  additionalPhoneNumber?: string;
  fullName: string;
  username?: string;
  region: string;
  city?: string;
  paymentMethod: '3' | '6' | '12' | 'full';
  productId: string;
}
