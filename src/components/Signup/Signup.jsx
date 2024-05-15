import './Signup.scss';
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

                    <div className='input-wrapper'>
                        <input required id="name" name='name' className="form-input" type="text" placeholder=" " />
                        <label className='input-label' htmlFor="login">{t("signup-page-name")}</label>
                    </div>
                    
                    <div className='input-wrapper'>
                        <input required id="login" name='login' className="form-input" type="text" placeholder=" " />
                        <label className='input-label' htmlFor="login">{t("login-page-login")}</label>
                    </div>

                    <div className='input-wrapper'>
                        <input required id="password" name='password' className="form-input" type="password" placeholder=" "/>
                        <label className='input-label' htmlFor="password">{t("login-page-password")}</label>
                    </div>

                    <div className='input-wrapper'>
                        <input required id="confirm-password" name='confirm-password' className="form-input" type="password" placeholder=" "/>
                        <label className='input-label' htmlFor="password">{t("signup-page-confirm-password")}</label>
                    </div>

                    <div className='login-button'>
                        <button disabled={true} type="submit" className='button rectangular-button colored'>{t("signup")}</button>
                    </div>
                </form>
            </section>

        </main>
    )
}

export default Signup;