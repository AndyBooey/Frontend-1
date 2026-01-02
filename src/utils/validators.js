export const validateEmails = (email, reEmail) => {
  if (!email || !reEmail) return "Email fields cannot be empty";
  if (email !== reEmail) return "Emails do not match";
  return "";
};

export const validateTerms = (accepted) => {
  if (!accepted) return "You must accept the Terms & Conditions";
  return "";
};
