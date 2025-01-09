import './Signup.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import { SIGNUP_FORM_INPUTS } from '../../utils/constants';
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const signupPageFormContent = {
    header: "signup-page-title",
    subtitle: "signup-page-description",
    link: "login",
    button: "signup",
}

function Signup () {
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
            name: 'Roman',
            email: 'roman@gmail.com',
            password: '12345678',
        },
        mode: 'onChange',
    });

    const onSubmit = async (values) => {
        const data = await dispatch(fetchRegister(values));
        if (!data.payload) {
            setErrorMessage('Не удалось зарегистрироваться!');
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
                    <h2 className='login-header'>{t(signupPageFormContent.header)}</h2>
                    <div className='form-subtitle'>
                        <p>{t(signupPageFormContent.subtitle)}</p>
                        <Link className='form-link' to="/auth/login">{t(signupPageFormContent.link)}</Link>
                    </div>
                    {SIGNUP_FORM_INPUTS.map(input => {
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
                            {t(signupPageFormContent.button)}
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

export default Signup;
