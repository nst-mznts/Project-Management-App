import './Signup.scss';
import PropTypes from 'prop-types';
import { SIGNUP_FORM_INPUTS } from '../../utils/constants';
import FormInputs from '../FormInputs/FormInputs';
import { useTranslation } from 'react-i18next';

function Signup ({ openLoginPage }) {
    const { t } = useTranslation();

    return (
        <main className='login-page'>
            <section className='login-content'>
                <form className='login-form' action="/">
                    <h2 className='login-header'>{t("signup-page-title")}</h2>
                    <div className='form-subtitle'>
                        <p>{t("signup-page-description")}</p>
                        <span className='form-link' onClick={openLoginPage}>{t("login")}</span>
                    </div>
                    <FormInputs listOfInputs={SIGNUP_FORM_INPUTS}/>
                    <div className='login-button'>
                        <button disabled={true} type="submit" className='button rectangular-button colored'>{t("signup")}</button>
                    </div>
                </form>
            </section>

        </main>
    )
}

Signup.propTypes = {
    openLoginPage: PropTypes.func.isRequired,
};

export default Signup;