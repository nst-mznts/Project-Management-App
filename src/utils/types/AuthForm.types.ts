import * as constant from '../constants';

/** Basic form interface */
export interface BaseFormValues {
  email: string;
  password: string;
}

/** Registration form interface */
export interface SignupFormValues extends BaseFormValues {
  name: string;
}

/** Props interface for AuthForm */
export interface AuthFormProps {
  isSignup: boolean;
  formContent: typeof constant.loginPageFormContent | typeof constant.signupPageFormContent;
  onSubmit: (values: BaseFormValues | SignupFormValues) => Promise<void>;
  errorMessage: string;
}

/** Interface for form inputs */
export interface AuthFormInput {
  id: keyof SignupFormValues | keyof BaseFormValues;
  type: string;
  value: string;
  minLength: number;
}
