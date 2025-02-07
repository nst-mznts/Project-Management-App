interface BaseFormValues {
  email: string;
  password: string;
}

interface SignupFormValues extends BaseFormValues {
  name: string;
}

interface AuthFormInput {
  id: keyof SignupFormValues | keyof BaseFormValues;
  type: string;
  value: string;
  minLength: number;
}

export const SIGNUP_FORM_INPUTS: AuthFormInput[] = [
  {
    id: 'name',
    value: 'signup-page-name',
    type: 'text',
    minLength: 1,
  },
  {
    id: 'email',
    value: 'login-page-login',
    type: 'email',
    minLength: 4,
  },
  {
    id: 'password',
    value: 'login-page-password',
    type: 'password',
    minLength: 8,
  },
];

export const LOGIN_FORM_INPUTS: AuthFormInput[] = [
  {
    id: 'email',
    value: 'login-page-login',
    type: 'email',
    minLength: 4,
  },
  {
    id: 'password',
    value: 'login-page-password',
    type: 'password',
    minLength: 8,
  },
];

interface RegistrationPageContent {
  header: string;
  subtitle: string;
  link: string;
  button: string;
}

export const loginPageFormContent: RegistrationPageContent = {
  header: 'login-page-title',
  subtitle: 'login-page-description',
  link: 'signup',
  button: 'login',
};

export const signupPageFormContent: RegistrationPageContent = {
  header: 'signup-page-title',
  subtitle: 'signup-page-description',
  link: 'login',
  button: 'signup',
};
