function isValid(str) { return /^\w+$/.test(str); } //只能有字母数字下划线
function IsAllLetter(str) { return /^[a-zA-Z]+$/.test(str) } //只能有字母
function IsAllNumber(str) { return /^\d+$/.test(str) } //只能有数字

const loginE1 = document.getElementById("login_user");
const loginE2 = document.getElementById("register_ID");
const loginE3 = document.getElementById("register_user");
loginE1.addEventListener("input", () => {
    if (isValid(loginE1.value) == false || loginE1.value.length >= 20) loginE1.value = ''
})
loginE2.addEventListener("input", () => {
    if (IsAllNumber(loginE2.value) == false) loginE2.value = ''
})
loginE3.addEventListener("input", () => {
    if (isValid(loginE3.value) == false) loginE3.value = ''
})