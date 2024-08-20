import { decodeBase64, encodeBase64 } from "./utils.js";

function init(){
    var str = "hello:shdkjsvd";
    let encodeData = encodeBase64(str);
    console.log('encodeData',encodeData);
    let decodeData = decodeBase64(encodeData);
    console.log('decodeData',decodeData);
}

init();