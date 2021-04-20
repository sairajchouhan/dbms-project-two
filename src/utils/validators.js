export const validateInputs = (data) => {
  let errors = {};
  if (data.username.trim() === '') errors.username = 'Username cannot be empty';
  if (data.email.trim() === '') errors.email = 'Email cannot be empty';

  var reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
  if (reg.test(data.email) === false) {
    errors.email = 'Invalid email';
  }
  if (data.password.length < 8)
    errors.password = 'Passwor must contain minimun of 8 characters';

  return errors;
};
