import logger from "./logger.js";
import { decodeBase64, encodeBase64, writeLog } from "./utils.js";
import moment from "moment";
function init() {
  logger.error(JSON.stringify({ a: 10 }));
}

init();
