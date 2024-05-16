import './FormInputs.scss';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

function FormInputs ({ listOfInputs, isError, handleUserInput }) {
    const { t } = useTranslation();

    return (
        <>
            {listOfInputs.map(input => {
                return (
                    <div className='input-wrapper' key={input.id}>
                        <div><p className={`message-invalid ${isError ? 'active' : ''}`}>{t(input.error)}</p></div>
                        <input required id={input.id} name={input.id} className="form-input" type={input.type} placeholder=" " onChange={handleUserInput}/>
                        <label className='input-label' htmlFor={input.id}>{t(input.value)}</label>
                    </div>
                )
            })}
        </>
    )
}

FormInputs.propTypes = {
    listOfInputs: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
        })
    ).isRequired,
    isError: PropTypes.bool.isRequired,
    handleUserInput: PropTypes.func.isRequired,
};

export default FormInputs;