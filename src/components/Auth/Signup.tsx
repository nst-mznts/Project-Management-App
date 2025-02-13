import './AuthForm.scss';
import { FC } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { signupPageFormContent } from '../../utils/constants';
import { fetchRegister } from '../../redux/slices/auth';
import { useState } from 'react';
import { handleAuthSubmit } from '../../utils/authUtils';
import AuthForm from './AuthForm';

const Signup: FC = () => {
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = handleAuthSubmit(dispatch, fetchRegister, setErrorMessage, 'signup-page-error');

  return (
    <AuthForm
      isSignup={true}
      formContent={signupPageFormContent}
      onSubmit={onSubmit}
      errorMessage={errorMessage}
    />
  );
};

export default Signup;
