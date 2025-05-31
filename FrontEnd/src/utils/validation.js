export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// ==================(login validation)===============
export const validateLoginForm = (formData) => {
  const errors = {};

  if (!isValidEmail(formData.email)) {
    errors.email = "Invalid Email. Please provide a valid email";
  }

  if (!formData.password || formData.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  return errors;
};

// ==================(Signup validation)===============
export const validateSignupForm = (formData) => {
  const newErrors = {};

  if (!isValidEmail(formData.email)) {
    newErrors.email = "Invalid Email. please provide a valid email";
  }

  if (formData.password.length < 8) {
    newErrors.password = "Password must be at least 8 characters";
  }

  if (formData.password !== formData.passwordConfirm) {
    newErrors.passwordConfirm = "The passwords do not match.";
  }

  return newErrors;
};
