import './AuthForm.scss';
import { FC, useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { loginPageFormContent } from '../../utils/constants';
import { fetchAuth } from '../../redux/slices/auth';
import { handleAuthSubmit } from '../../utils/authUtils';
import AuthForm from './AuthForm';

const Login: FC = () => {
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = handleAuthSubmit(dispatch, fetchAuth, setErrorMessage, 'login-page-error');

  return (
    <AuthForm
      isSignup={false}
      formContent={loginPageFormContent}
      onSubmit={onSubmit}
      errorMessage={errorMessage}
    />
  );
};

export default Login;
