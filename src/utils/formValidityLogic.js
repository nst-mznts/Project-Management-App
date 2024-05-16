export const getErrorText = (listOfInputs, currentInputId, isEmptyInput) => {
    const activeInput = listOfInputs.find(input => input.id === currentInputId);
    if (isEmptyInput) {
        activeInput.error = `login-page-${currentInputId}-empty`;
    } else {
        activeInput.error = "";
    }
    return listOfInputs;
}

