import './FormInputs.scss';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

function FormInputs ({ listOfInputs, content, onOpen, onSubmit }) {
    const { t } = useTranslation();
    const {
        register,
        formState: {
            errors,
            isValid,
        },
        handleSubmit,
    } = useForm({
        mode: 'onBlur'
    });

    return (
        <form className='login-form' action="/" onSubmit={handleSubmit(onSubmit)}>
            <h2 className='login-header'>{t(content.header)}</h2>
            <div className='form-subtitle'>
                <p>{t(content.subtitle)}</p>
                <span className='form-link' onClick={onOpen}>{t(content.link)}</span>
            </div>
            {listOfInputs.map(input => {
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
                    {t(content.button)}
                </button>
            </div>
        </form>
    )
}

FormInputs.propTypes = {
    listOfInputs: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            minLength: PropTypes.number.isRequired,
        })
    ).isRequired,
    content: PropTypes.shape({
        header: PropTypes.string.isRequired,
        subtitle: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        button: PropTypes.string.isRequired,
    }).isRequired,
    onOpen: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default FormInputs;
