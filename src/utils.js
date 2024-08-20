export function encodeBase64(str){
   return  Buffer.from(str).toString('base64');
}

export function decodeBase64(base64String){
    return Buffer.from(base64String, 'base64').toString('utf-8');
}