

import crypto from 'node:crypto'
import fs from "node:fs"

const IV_LENGTH=+process.env.IV_LENGTH
console.log(process.env)

const ENCRYPTION_SECRET_KEY=Buffer.from(process.env.ENCRYPTION_SECRET_KEY)

export const encrypt= (text)=>{

    const iv = crypto.randomBytes(IV_LENGTH)
    // console.log("IV Generation:",IV_LENGTH )

const cipher = crypto.createCipheriv("aes-256-cbc",ENCRYPTION_SECRET_KEY,iv)
// console.log("Cipher Creation result",cipher)

let encryptedData = cipher.update(text,"utf-8","hex")
// console.log("Updated Cipher result:",encryptedData)

encryptedData +=cipher.final("hex")
// console.log("Final cipher result:",encryptedData)
return `${iv.toString('hex')}:${encryptedData}`
}

export const decrypt=(encryptedData)=>{
    const [iv,encryptedText] = encryptedData.split(":")
    console.log("IV",iv)
    console.log("Encrypted Text",encryptedText)
    const binarylikeiv=Buffer.from(iv,"hex")
    const decipher = crypto.createDecipheriv("aes-256-cbc",ENCRYPTION_SECRET_KEY,binarylikeiv)
    let decryptedData = decipher.update(encryptedText,"hex","utf-8")
    decryptedData += decipher.final("utf-8")
    return decryptedData
    

}

// Generate 2 keys Public , private --> Public key for encryption , private key for decryption

if(fs.existsSync("publicKey.pem"&&"privateKey.pem"))
{
    console.log("Key already generated")
}else{
    const{publicKey,privateKey}=crypto.generateKeyPairSync("rsa",{
        modulusLength:2084,
        publicKeyEncoding:{
            type:"pkcs1",
            format:"pem"
        },
        privateKeyEncoding:{
            type:"pkcs1",
            format:"pem"
        }
    })
    fs.writeFileSync("publicKey.pem",publicKey)
    fs.writeFileSync("privateKey.pem",privateKey)
}

export const asymmetricEncryption=(text)=>{

    const publicKey=fs.readFileSync("publicKey.pem","utf-8")
    const bufferedText =Buffer.from(text)

    const encryptedData = crypto.publicEncrypt({
        key : publicKey,
        padding:crypto.constants.RSA_PKCS1_OAEP_PADDING
    },
bufferedText
)
return encryptedData.toString("hex")
}


export const asymmetricDecryption=(text)=>{

    const privateKey=fs.readFileSync("privateKey.pem","utf-8")
    const bufferedText =Buffer.from(text,"hex")

    const decryptedData = crypto.privateDecrypt({
        key : privateKey,
        padding:crypto.constants.RSA_PKCS1_OAEP_PADDING
    },
     bufferedText
)
return decryptedData.toString("utf-8")
}