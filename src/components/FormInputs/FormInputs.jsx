import './FormInputs.scss';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

function FormInputs ({ listOfInputs }) {
    const { t } = useTranslation();

    return (
        <>
            {listOfInputs.map(input => {
                return (
                    <div className='input-wrapper' key={input.id}>
                        <input required id={input.id} name={input.id} className="form-input" type={input.type} placeholder=" "/>
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
};

export default FormInputs;