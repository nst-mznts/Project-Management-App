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
            setErrorMessage('Не удалось авторизоваться! Неверный логин или пароль.');
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
        defaultValues={{email: 'nastya@gmail.com', password: '12345678'}}
        onSubmit={onSubmit}
        errorMessage={errorMessage}
        />
    )
}

export default Login;
