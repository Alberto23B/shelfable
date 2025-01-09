export function validateUsername(username) {
  //min length 6 character, only letters, numbers and no space (special: _-.)
  const regex = /^[a-zA-Z0-9_.-]*$/g;
  if (username.length < 6) {
    return false;
  }
  return regex.test(username);
}

export function validatePassword(password, passwordCheck) {
  //at least 6 characters, one UC, one LC, one digit, one special
  const regex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/g;

  if (regex.test(password)) {
    return password === passwordCheck;
  } else {
    return false;
  }
}

export function validateEmail(email) {
  const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

  return regex.test(email);
}
