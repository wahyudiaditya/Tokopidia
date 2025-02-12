import bcrypt from "bcryptjs";

export const hashPw = (password: string) => {
  return bcrypt.hashSync(password);
};

export const comparePw = (password: string, hashedPw: string) => {
  return bcrypt.compareSync(password, hashedPw);
};
