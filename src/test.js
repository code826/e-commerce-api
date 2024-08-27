import { decodeBase64, encodeBase64 } from "./utils.js";

function init() {
  var obj = [
    { a: "10", b: 20 },
    { a: "10", b: 30 },
  ];
  let newObj = obj.find((o1) => o1.a === "10");
  console.log(newObj);
}

init();
