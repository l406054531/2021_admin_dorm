import { Encrypt, Decrypt } from './Crypto';
import Cookies from 'js-cookie'


const radioKey = Encrypt('radio')
const roleKey = Encrypt('role')
const infoKey = Encrypt('userInfo')

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

export {
    setRadio,
    getRadio,
    setRole,
    getRole,
    setUserInfo,
    getUserInfo
}