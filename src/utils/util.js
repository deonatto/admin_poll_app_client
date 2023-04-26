export const nameIsValid = (name) => {
  const regName = /\d/;
  const hasNumbers = regName.test(name);
  return !hasNumbers && name.length >= 2;
};

export const emailIsValid = (email) => {
  return email.includes("@") && email.length > 8;
};

export const passwordIsValid = (password) => {
  return password.length > 5;
};

export const descriptionIsValid = (description) => {
  return description.length >= 5;
};
