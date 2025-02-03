import './AuthForm.scss';
import { FC } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { Navigate, Link } from 'react-router-dom';
import * as constant from '../../utils/constants';
import { selectIsAuth } from '../../redux/slices/auth';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface BaseFormValues {
    email: string;
    password: string;
}

interface SignupFormValues extends BaseFormValues {
    name: string;
}

interface AuthFormProps {
    isSignup: boolean;
    formContent: typeof constant.loginPageFormContent | typeof constant.signupPageFormContent;
    defaultValues: BaseFormValues | SignupFormValues;
    onSubmit: (values: BaseFormValues | SignupFormValues) =>  Promise<void>;
    errorMessage: string;
}

interface AuthFormInput {
    id: keyof SignupFormValues | keyof BaseFormValues;
    type: string;
    value: string;
    minLength: number;
}

const AuthForm:FC<AuthFormProps> = ({
    isSignup,
    formContent,
    defaultValues,
    onSubmit,
    errorMessage,
}) => {
    const { t } = useTranslation();
    const isAuth = useAppSelector(selectIsAuth);
    const formInputs = isSignup ? constant.SIGNUP_FORM_INPUTS : constant.LOGIN_FORM_INPUTS;
    const redirectPath = isSignup ? "/auth/login" : "/auth/signup";

    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
    } = useForm({
        defaultValues: defaultValues as SignupFormValues | BaseFormValues,
        mode: 'onChange',
    });

    if (isAuth) {
        return <Navigate to='/boards' />;
    }

    return (
        <main className='login-page'>
            <section className='login-content'>
                <Link
                    className="button rectangular-button additional-colored"
                    to='/'
                >
                    {t("back-button")}
                </Link>
                <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
                    <h2 className='login-header'>{t(formContent.header)}</h2>
                    <div className='form-subtitle'>
                        <p>{t(formContent.subtitle)}</p>
                        <Link className='form-link' to={redirectPath}>{t(formContent.link)}</Link>
                    </div>
                    {formInputs.map((input: AuthFormInput) => {
                        const fieldError = errors[input.id];
                        return (
                            <div className='input-wrapper' key={input.id}>
                                <div>
                                    {fieldError && <p className='message-invalid'>{fieldError.message}</p>}
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
                            className='button rectangular-button colored width100'
                        >
                            { isSignup ? t(constant.signupPageFormContent.button) : t(constant.loginPageFormContent.button)}
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

export default AuthForm;