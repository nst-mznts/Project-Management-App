import './Login.scss';
import { FC, useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { loginPageFormContent } from '../../utils/constants';
import { fetchAuth } from '../../redux/slices/auth';
import AuthForm from '../AuthForm/AuthForm';

interface BaseFormValues {
    email: string;
    password: string;
}

const Login:FC = () => {
    const dispatch = useAppDispatch();
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (values: BaseFormValues) => {
        const data = await dispatch(fetchAuth(values));
        if (!data.payload) {
            setErrorMessage('login-page-error');
            return;
        }
      
        if ('token' in data.payload) {
            localStorage.setItem('token', data.payload.token);
        }
    }

    return (
        <AuthForm
        isSignup={false}
        formContent={loginPageFormContent}
        onSubmit={onSubmit}
        errorMessage={errorMessage}
        />
    )
}

export default Login;
