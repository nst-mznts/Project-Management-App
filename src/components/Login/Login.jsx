import './Login.scss';
import PropTypes from 'prop-types';
import { LOGIN_FORM_INPUTS } from '../../utils/constants';
import FormInputs from '../FormInputs/FormInputs';
import { useTranslation } from 'react-i18next';

function Login ({ openSignupPage }) {
    const { t } = useTranslation();

    return (
        <main className='login-page'>
            <section className='login-content'>
                <form className='login-form' action="/">
                    <h2 className='login-header'>{t("login-page-title")}</h2>
                    <div className='form-subtitle'>
                        <p>{t("login-page-description")}</p>
                        <span className='form-link' onClick={openSignupPage}>{t("signup")}</span>
                    </div>
                    <FormInputs listOfInputs={LOGIN_FORM_INPUTS} />
                    <div className='login-button'>
                        <button disabled={true} type="submit" className='button rectangular-button colored'>{t("login")}</button>
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
