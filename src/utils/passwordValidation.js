const withoutSpecialChars = /^[^-() /]*$/;
const containsLetters = /^.*[a-zA-Z]+.*$/;
const containNumber = /^.*[0-9]+.*$/;
const minimum8Chars = /^.{8,}$/

export const validatePassword = password => {
  return withoutSpecialChars.test(password) && containNumber.test(password) && containsLetters.test(password) && minimum8Chars.test(password);
};