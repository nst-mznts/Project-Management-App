import * as constant from '../constants';
import { SubmitHandler } from 'react-hook-form';

/** Unified form interface */
export interface AuthFormValues {
  name?: string;
  email: string;
  password: string;
}

/** Props interface for AuthForm */
export interface AuthFormProps {
  isSignup: boolean;
  formContent: typeof constant.loginPageFormContent | typeof constant.signupPageFormContent;
  onSubmit: SubmitHandler<AuthFormValues>;
  errorMessage: string;
}

/** Interface for form inputs */
export interface AuthFormInput {
  id: keyof AuthFormValues;
  type: string;
  value: string;
  minLength: number;
}
