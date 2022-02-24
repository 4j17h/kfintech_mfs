import * as yup from 'yup';

export const loginValSchema = yup.object().shape({
  email: yup
    .string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required'),
  password: yup.string().max(255).required('Password is required'),
});
