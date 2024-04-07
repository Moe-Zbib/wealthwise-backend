const bcrypt = require("bcrypt");

const saltRounds = 11;
class EncryptionService {
  async setEncrypt(data) {
    const hashedData = await bcrypt.hash(data, saltRounds);
    return hashedData;
  }

  async verifyEncrypt(data, hashedData) {
    return await bcrypt.compare(data, hashedData);
  }
}

module.exports = new EncryptionService();
