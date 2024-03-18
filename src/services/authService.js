exports.login = async (email, password) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }

  // Your login logic here

  console.log(email);
};
