import './Login.scss';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { getErrorText } from '../../utils/formValidityLogic';
import { LOGIN_FORM_INPUTS } from '../../utils/constants';
import FormInputs from '../FormInputs/FormInputs';
import { useTranslation } from 'react-i18next';

function Login ({ openSignupPage }) {
    const { t } = useTranslation();
    const [isFormInvalid, setIsFormInvalid] = useState(true);
    const [isError, setIsError] = useState(false);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const checkFormValidity = () => {
        if (login.length > 0 && password.length > 0) {
            setIsFormInvalid(false);
        } else {
            setIsFormInvalid(true);
        }
    }

    const verifyThatFormInputsAreNotEmpty = (event) => {
        const currentInput = event.target.value;
        switch(event.target.id){
            case 'login':
                setLogin(currentInput);
                break;
            case 'password':
                setPassword(currentInput);
                break;
            default:
                break;
        }
        if (currentInput.length === 0) {
            setIsError(true);
            getErrorText(LOGIN_FORM_INPUTS, event.target.id, true);
            setIsFormInvalid(true);
        } else {
            setIsError(false);
            getErrorText(LOGIN_FORM_INPUTS, event.target.id, false);
            checkFormValidity();
        }
    }

    return (
        <main className='login-page'>
            <section className='login-content'>
                <form className='login-form' action="/">
                    <h2 className='login-header'>{t("login-page-title")}</h2>
                    <div className='form-subtitle'>
                        <p>{t("login-page-description")}</p>
                        <span className='form-link' onClick={openSignupPage}>{t("signup")}</span>
                    </div>
                    <FormInputs listOfInputs={LOGIN_FORM_INPUTS} isError={isError} handleUserInput={verifyThatFormInputsAreNotEmpty}/>
                    <div className='login-button'>
                        <button disabled={isFormInvalid} type="submit" className='button rectangular-button colored'>{t("login")}</button>
                    </div>
                </form>
            </section>
        </main>
    )
}

Login.propTypes = {
    openSignupPage: PropTypes.func.isRequired,
};

export default Login;
