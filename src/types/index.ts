// Form data types
export interface FormData {
  niche: string;
  brandUrl: string;
  adSpend: string;
  painPoint: string;
  name: string;
  email: string;
  phone?: string;
}

// Pain point card type
export interface PainPoint {
  id: number;
  title: string;
  description: string;
}

// Service benefit type
export interface ServiceBenefit {
  id: number;
  title: string;
  description: string;
}

// Digital native advantage type
export interface DigitalAdvantage {
  id: number;
  title: string;
  description: string;
}

// Form validation schema type
export interface FormValidationSchema {
  niche: string;
  brandUrl: string;
  adSpend: string;
  painPoint: string;
  name: string;
  email: string;
  phone?: string;
} 