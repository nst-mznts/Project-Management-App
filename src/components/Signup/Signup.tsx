import './Signup.scss';
import { FC } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { signupPageFormContent } from '../../utils/constants';
import { fetchRegister } from '../../redux/slices/auth';
import { useState } from 'react';
import AuthForm from '../AuthForm/AuthForm';

interface BaseFormValues {
    email: string;
    password: string;
}

interface SignupFormValues extends BaseFormValues {
    name: string;
}

const Signup:FC = () => {
    const dispatch = useAppDispatch();
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (values: SignupFormValues) => {
        const data = await dispatch(fetchRegister(values));
        if (!data.payload) {
            setErrorMessage('Не удалось зарегистрироваться!');
            return;
        }
      
        if ('token' in data.payload) {
            localStorage.setItem('token', data.payload.token);
        }
    }

    return (
        <AuthForm
            isSignup={true}
            formContent={signupPageFormContent}
            defaultValues={{name: 'Roman', email: 'roman@gmail.com', password: '12345678'}}
            onSubmit={onSubmit}
            errorMessage={errorMessage}
        />
    )
}

export default Signup;
