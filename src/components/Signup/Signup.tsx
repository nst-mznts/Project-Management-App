import './Signup.scss';
import { FC } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { signupPageFormContent } from '../../utils/constants';
import { fetchRegister } from '../../redux/slices/auth';
import { useState } from 'react';
import { RegisterParams } from '../../utils/types/AuthForm.types';
import AuthForm from '../AuthForm/AuthForm';

const Signup: FC = () => {
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (values: RegisterParams) => {
    const data = await dispatch(fetchRegister(values));
    if (!data.payload) {
      setErrorMessage('signup-page-error');
      return;
    }

    if ('token' in data.payload) {
      localStorage.setItem('token', data.payload.token);
    }
  };

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
