import { Encrypt, Decrypt } from './Crypto';

const radioKey = Encrypt('radio')
const roleKey = Encrypt('role')
const infoKey = Encrypt('userInfo')
const routersKyt = Encrypt('routers')

function setRadio(val) {
    return sessionStorage.setItem(radioKey, Encrypt(val))
}

function getRadio() {
    return Decrypt(sessionStorage.getItem(radioKey) + "")
}

function setRole(val) {
    return sessionStorage.setItem(roleKey, Encrypt(val))
}

function getRole() {
    return Decrypt(sessionStorage.getItem(roleKey) + "")
}

function setUserInfo(val) {
    return sessionStorage.setItem(infoKey, Encrypt(val))
}

function getUserInfo() {
    return Decrypt(sessionStorage.getItem(infoKey) + "")
}

function setRouters(val) {
    // return sessionStorage.setItem(routersKyt, Encrypt(val))
    return sessionStorage.setItem(routersKyt, Encrypt(val))
}

function getRouters() {
    return Decrypt(sessionStorage.getItem(routersKyt) + "")
}


export {
    setRadio,
    getRadio,
    setRole,
    getRole,
    setUserInfo,
    getUserInfo,
    setRouters,
    getRouters
}