import fs from "fs/promises";

export function encodeBase64(str) {
  return Buffer.from(str).toString("base64");
}

export function decodeBase64(base64String) {
  return Buffer.from(base64String, "base64").toString("utf-8");
}

export async function writeLog(logContent) {
  try {
    logContent = new Date().toString() + ": " + logContent + "\n";
    let data = await fs.appendFile("./storage/logs/logger.log", logContent);
  } catch (err) {
    console.log("error", err);
  }
}
