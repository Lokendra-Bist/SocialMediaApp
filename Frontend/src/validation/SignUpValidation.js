export const validateForm = ({ formData, setErrors }) => {
  const newErrors = {};

  if (!formData.firstName.trim()) {
    newErrors.firstName = "First name is required";
  } else if (formData.firstName.length < 3) {
    newErrors.firstName = "First name must be at least 3 characters";
  } else if (formData.firstName.length > 15) {
    newErrors.firstName = "First name cannot exceed 15 characters";
  }

  if (!formData.lastName.trim()) {
    newErrors.lastName = "Last name is required";
  } else if (formData.lastName.length < 3) {
    newErrors.lastName = "Last name must be at least 3 characters";
  } else if (formData.lastName.length > 15) {
    newErrors.lastName = "Last name cannot exceed 15 characters";
  }

  if (!formData.dob) {
    newErrors.dob = "Date of birth is required";
  } else {
    const dob = new Date(formData.dob);
    const today = new Date();

    if (dob >= today) {
      newErrors.dob = "Please enter a valid date of birth";
    }
  }

  if (!formData.gender) {
    newErrors.gender = "Please select your gender";
  }

  if (!formData.email.trim()) {
    newErrors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
    newErrors.email = "Please enter a valid email";
  }

  if (!formData.password) {
    newErrors.password = "Password is required";
  } else if (formData.password.length < 8) {
    newErrors.password = "Password must be at least 8 characters";
  } else if (formData.password.length > 20) {
    newErrors.password = "Password cannot exceed 20 characters";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};
