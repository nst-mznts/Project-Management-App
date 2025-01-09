import './Login.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import { LOGIN_FORM_INPUTS } from '../../utils/constants';
import { fetchAuth, selectIsAuth } from '../../redux/slices/auth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const loginPageFormContent = {
    header: "login-page-title",
    subtitle: "login-page-description",
    link: "signup",
    button: "login",
}

function Login () {
    const { t } = useTranslation();
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState('');

    const {
        register,
        formState: {
            errors,
            isValid,
        },
        handleSubmit,
    } = useForm({
        defaultValues: {
            email: 'nastya@gmail.com',
            password: '12345678',
        },
        mode: 'onChange',
    });

    const onSubmit = async (values) => {
        const data = await dispatch(fetchAuth(values));
        if (!data.payload) {
            setErrorMessage('Не удалось авторизоваться! Неверный логин или пароль.');
            return;
        }
      
        if ('token' in data.payload) {
            localStorage.setItem('token', data.payload.token);
        }
    }

    if (isAuth) {
        return <Navigate to='/boards' />;
    }

    return (
        <main className='login-page'>
            <section className='login-content'>
                <form className='login-form' action="/" onSubmit={handleSubmit(onSubmit)}>
                    <h2 className='login-header'>{t(loginPageFormContent.header)}</h2>
                    <div className='form-subtitle'>
                        <p>{t(loginPageFormContent.subtitle)}</p>
                        <Link className='form-link' to="/auth/signup">{t(loginPageFormContent.link)}</Link>
                    </div>
                    {LOGIN_FORM_INPUTS.map(input => {
                        return (
                            <div className='input-wrapper' key={input.id}>
                                <div>
                                    {errors?.[input.id] && <p className='message-invalid'>{errors?.[input.id]?.message}</p>}
                                </div>
                                <input
                                    id={input.id}
                                    {...register(input.id, {
                                        required: t(`login-page-${input.id}-empty`),
                                        minLength: {
                                            value: input.minLength,
                                            message: t(`login-page-${input.id}-error`),
                                        }
                                    })}
                                    className="form-input"
                                    type={input.type}
                                    placeholder=" "
                                />
                                <label className='input-label' htmlFor={input.id}>{t(input.value)}</label>
                            </div>
                        )
                    })}
                    <div className='login-button'>
                        <button
                            disabled={!isValid}
                            type="submit"
                            className='button rectangular-button colored'
                        >
                            {t(loginPageFormContent.button)}
                        </button>
                        
                    </div>
                    <div className='message-invalid-wrapper'>
                        {errorMessage && <p className='message-invalid'>{errorMessage}</p>}
                    </div>
                </form>
            </section>
        </main>
    )
}

export default Login;
