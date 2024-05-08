import './Login.scss';
import { useTranslation } from 'react-i18next';

function Login () {
    const { t } = useTranslation();

    return (
        <main className='login-page'>
            <section className='login-content'>
                <form className='login-form' action="/">
                    <h2>{t("login-page-login")}</h2>
                    <p>{t("login-page-description")}</p>
                </form>
            </section>
        </main>
    )
}

export default Login;
