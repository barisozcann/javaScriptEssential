function performOperation() {
    // 1. Girdi alanlarından değerleri al ve tam sayıya çevir
    let num1 = parseInt(document.getElementById('input1').value);
    let num2 = parseInt(document.getElementById('input2').value);

    // 2. Girdilerin geçerli sayılar olup olmadığını kontrol et
    if (!isNaN(num1) && !isNaN(num2)) {
        // Sayılar geçerliyse çarpma fonksiyonunu çağır
        let result = multiply(num1, num2);

        // Sonucu ekranda göster
        displayResult(result);
    } else {
        // Hatalı giriş yapıldıysa kullanıcıyı uyar
        displayResult('Lütfen geçerli sayılar giriniz.');
    }
}

function multiply(a, b) {
    // DEBUGGER: Tarayıcı konsolu açıksa kod burada durur!
    // Bu sayede değişkenlerin o anki değerlerini inceleyebilirsin.
    debugger;

    // Sayıları çarp ve sonucu döndür
    return a * b;
}

function displayResult(result) {
    // Sonucu HTML içindeki 'result' id'li paragraf elementine yazdır
    const resultElement = document.getElementById('result');
    resultElement.textContent = `Sonuç: ${result}`;
}