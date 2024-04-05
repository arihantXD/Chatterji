import bcrypt from "bcryptjs";

export const createHash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const comparePassword = async (hashPassword, password) => {
  return await bcrypt.compare(hashPassword, password);
};
