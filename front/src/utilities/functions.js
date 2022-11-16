export const getRoleEmployeeRole = (role) => {
  if (role === 1) {
    return "Developer";
  } else if (role === 2) {
    return "Designer";
  }
  return "Human Ressources";
};
