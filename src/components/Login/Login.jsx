import './Login.scss';
import PropTypes from 'prop-types';
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
                    
                    <div className='input-wrapper'>
                        <input required id="login" name='login' className="form-input" type="text" placeholder=" " />
                        <label className='input-label' htmlFor="login">{t("login-page-login")}</label>
                    </div>

                    <div className='input-wrapper'>
                        <input required id="password" name='password' className="form-input" type="password" placeholder=" "/>
                        <label className='input-label' htmlFor="password">{t("login-page-password")}</label>
                    </div>

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
