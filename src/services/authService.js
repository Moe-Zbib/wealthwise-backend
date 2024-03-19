const { hashData } = require("./encryptionService");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateCredentials = (email, data) => {
  if (!email || !data) {
    throw new Error("Email and data are required");
  }

  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }

  if (data.length < 8) {
    throw new Error("Data must be at least 8 characters");
  }
};

exports.login = async (email, data, pepper) => {
  validateCredentials(email, data);

  console.log(email);
};

exports.register = async (email, data) => {
  validateCredentials(email, data);
  console.log(email, data);

  const { hashedData, pepper } = await hashData(data);
  console.log(hashedData);
};
