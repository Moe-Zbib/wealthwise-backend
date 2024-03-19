const bcrypt = require("bcrypt");
const crypto = require("crypto");

const generatePepper = () => {
  const byteLength = 16;
  return crypto.randomBytes(byteLength).toString("hex");
};

const saltRounds = 11;

exports.hashData = async (data) => {
  try {
    console.log("hashing");
    const pepper = generatePepper();
    const hashedData = await bcrypt.hash(data + pepper, saltRounds);
    return { hashedData, pepper };
  } catch (e) {
    throw new Error(`Error hashing data: ${e}`);
  }
};

exports.compareData = async (data, hashedData, pepper) => {
  try {
    return await bcrypt.compare(data + pepper, hashedData);
  } catch (e) {
    throw new Error(`Error comparing data: ${e}`);
  }
};
