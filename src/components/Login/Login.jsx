import './Login.scss';
import PropTypes from 'prop-types';
import { LOGIN_FORM_INPUTS } from '../../utils/constants';
import FormInputs from '../FormInputs/FormInputs';

const loginPageFormContent = {
    header: "login-page-title",
    subtitle: "login-page-description",
    link: "signup",
    button: "login",
}

function Login ({ openSignupPage, openBoardsPage, getUserName }) {
    const onSubmit = (data) => {
        openBoardsPage();
        getUserName(data.login);
    }

    return (
        <main className='login-page'>
            <section className='login-content'>
                <FormInputs
                    listOfInputs={LOGIN_FORM_INPUTS}
                    content={loginPageFormContent}
                    onOpen={openSignupPage}
                    onSubmit={onSubmit}
                />
            </section>
        </main>
    )
}

Login.propTypes = {
    openSignupPage: PropTypes.func.isRequired,
    openBoardsPage: PropTypes.func.isRequired,
    getUserName: PropTypes.func.isRequired,
};

export default Login;