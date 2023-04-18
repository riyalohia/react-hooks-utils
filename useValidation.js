const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const OTP_REGEX = /^\d{6}$/;

/**
 * Checks:
 * - minimum 8 characters
 * - no spaces
 */
export const PASSWORD_VALID_REGEX = /^[^\s]{8,}$/;

const useValidation = () => {
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const validateEmail = (email) => {
    if (email) {
      const isValid = EMAIL_REGEX.test(email);
      setIsError(!isValid);
      setErrorMsg(isValid ? '' : 'Please enter a valid email');
      return isValid;
    }
    setIsError(true);
    setErrorMsg('');
    return false;
  };

  const validateOTP = (otp) => {
    if (otp) {
      const isValid = OTP_REGEX.test(otp);
      setIsError(!isValid);
      setErrorMsg(isValid ? '' : 'Please check the code');
      return isValid;
    }
    setIsError(true);
    setErrorMsg('');
    return false;
  };

  const validatePassword = (password, ignoreCheck = false) => {
    if (password) {
      if (ignoreCheck) return true;
      const isValid = PASSWORD_VALID_REGEX.test(password);
      setIsError(!isValid);
      setErrorMsg(isValid ? '' : 'Please check the password');
      return isValid;
    }
    setIsError(true);
    setErrorMsg('');
    return false;
  };

  return {
    validateEmail,
    validateOTP,
    validatePassword,
    isError,
    errorMsg,
    setErrorMsg,
    setIsError
  };
};

export default useValidation;
