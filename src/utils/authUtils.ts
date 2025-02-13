import { SubmitHandler } from 'react-hook-form';
import { AppDispatch } from '../redux/store';
import { User } from '../utils/types/BasicTypes.types';
import { AuthFormValues } from '../utils/types/AuthForm.types';
import { fetchAuth, fetchRegister } from '../redux/slices/auth';

type AuthAction = typeof fetchAuth | typeof fetchRegister;

export const handleAuthSubmit = (
  dispatch: AppDispatch,
  action: AuthAction,
  setErrorMessage: (message: string) => void,
  errorKey: string
): SubmitHandler<AuthFormValues> => {
  return async (values) => {
    const result = await dispatch(action(values));
    const data = result.payload as User & { token?: string };

    if (!data) {
      setErrorMessage(errorKey);
      return;
    }

    if (data.token) {
      localStorage.setItem('token', data.token);
    }
  };
};
