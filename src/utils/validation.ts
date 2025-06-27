import * as yup from 'yup';

export const formValidationSchema = yup.object({
  niche: yup
    .string()
    .required('Please select your niche'),
  
  brandUrl: yup
    .string()
    .required('Please enter your brand URL')
    .url('Please enter a valid URL'),
  
  adSpend: yup
    .string()
    .required('Please select your current ad spend'),
  
  painPoint: yup
    .string()
    .required('Please select your biggest pain point'),
  
  name: yup
    .string()
    .required('Please enter your name')
    .min(2, 'Name must be at least 2 characters'),
  
  email: yup
    .string()
    .required('Please enter your email')
    .email('Please enter a valid email address'),
  
  phone: yup
    .string()
    .optional()
    .matches(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number')
});

export type FormData = yup.InferType<typeof formValidationSchema>; 