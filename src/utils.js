import bcrypt from "bcrypt";
export function encodeBase64(str) {
  return Buffer.from(str).toString("base64");
}

export function decodeBase64(base64String) {
  return Buffer.from(base64String, "base64").toString("utf-8");
}
export async function hashPassword(password, saltRound = 10) {
  let salt = await bcrypt.genSalt(saltRound);
  let hash = await bcrypt.hash(password, salt);
  return hash;
}

export async function verifyPassword(plainPassword, hashPassword) {
  const passwordMatch = await bcrypt.compare(plainPassword, hashPassword);
  return passwordMatch;
}
