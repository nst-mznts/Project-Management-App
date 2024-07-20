import './Signup.scss';
import PropTypes from 'prop-types';
import { SIGNUP_FORM_INPUTS } from '../../utils/constants';
import FormInputs from '../FormInputs/FormInputs';

const signupPageFormContent = {
    header: "signup-page-title",
    subtitle: "signup-page-description",
    link: "login",
    button: "signup",
}

function Signup ({ openLoginPage, openBoardsPage }) {
    const onSubmit = () => {
        openBoardsPage();
        // alert(JSON.stringify(data));
    }

    return (
        <main className='login-page'>
            <section className='login-content'>
                <FormInputs
                    listOfInputs={SIGNUP_FORM_INPUTS}
                    content={signupPageFormContent}
                    onOpen={openLoginPage}
                    onSubmit={onSubmit}
                />
            </section>
        </main>
    )
}

Signup.propTypes = {
    openLoginPage: PropTypes.func.isRequired,
    openBoardsPage: PropTypes.func.isRequired,
};

export default Signup;
