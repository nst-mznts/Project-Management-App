import * as constant from '../constants';

/** Basic form interface */
export interface AuthParams {
  email: string;
  password: string;
}

/** Registration form interface */
export interface RegisterParams {
  name: string;
  email: string;
  password: string;
}

/** Props interface for AuthForm */
export interface AuthFormProps {
  isSignup: boolean;
  formContent: typeof constant.loginPageFormContent | typeof constant.signupPageFormContent;
  onSubmit: (values: AuthParams | RegisterParams) => Promise<void>;
  errorMessage: string;
}

/** Interface for form inputs */
export interface AuthFormInput {
  id: keyof AuthParams | keyof RegisterParams;
  type: string;
  value: string;
  minLength: number;
}
