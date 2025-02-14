import './AuthForm.scss';
import { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { loginPageFormContent, signupPageFormContent } from '../../utils/constants';
import { fetchAuth, fetchRegister } from '../../redux/slices/auth';
import { handleAuthSubmit } from '../../utils/authUtils';
import AuthForm from './AuthForm';

const Auth: FC = () => {
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const location = useLocation();

  const isSignup = location.pathname === '/auth/signup';
  const formContent = isSignup ? signupPageFormContent : loginPageFormContent;

  const submitHandler = isSignup
    ? handleAuthSubmit(dispatch, fetchRegister, setErrorMessage, 'signup-page-error')
    : handleAuthSubmit(dispatch, fetchAuth, setErrorMessage, 'login-page-error');

  return (
    <AuthForm
      isSignup={isSignup}
      formContent={formContent}
      onSubmit={submitHandler}
      errorMessage={errorMessage}
    />
  );
};

export default Auth;
