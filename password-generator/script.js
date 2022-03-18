(function () {
  const result = document.getElementById('psg-result');
  const clipboard = document.getElementById('psg-clipboard');
  const pswLength = document.getElementById('psw-length');
  const pswUpperCase = document.getElementById('psw-uppercase');
  const pswLowerCase = document.getElementById('psw-lowercase');
  const pswNumbers = document.getElementById('psw-numbers');
  const pswSymbols = document.getElementById('psw-symbols');
  const pswGenerate = document.getElementById('psw-generate');

  const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    numbers: getRandomNumber,
    symbols: getRandomSymbols
  }

  clipboard.addEventListener('click', () => {
    const password = result.innerText;

    if (!password) return;

    const textarea = document.createElement('textarea');
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard');
  });

  pswGenerate.addEventListener('click', () => {
    const length = +pswLength.value;
    const hasUpper = pswUpperCase.checked;
    const hasLower = pswLowerCase.checked;
    const hasNumbers = pswNumbers.checked;
    const hasSymbols = pswSymbols.checked;

    result.innerText = generatePassword(length, hasUpper, hasLower, hasNumbers, hasSymbols);
  });

  function generatePassword(length, upper, lower, numbers, symbols) {
    let password = '';
    const countTypes = upper + lower + numbers + symbols;
    const typesArr = [{upper}, {lower}, {numbers}, {symbols}].filter(item => Object.values(item)[0]);

    if (countTypes === 0) return '';

    for (let i = 0; i < length; i += countTypes) {
      typesArr.forEach(type => {
        const funcName = Object.keys(type)[0];
        password += randomFunc[funcName]();
      });
    }
    return password;
  }

//https://www.w3schools.com/html/html_charset.asp
  function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  }

  function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }

  function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  }

  function getRandomSymbols() {
    const symbols = '!@#$%^&*()_+<>?/.,';
    return symbols[Math.floor(Math.random() * symbols.length)];
  }

})();
