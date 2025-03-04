let currentInput = '';
let operator = '';
let previousInput = '';
let result = null;

// Menambahkan event listener untuk mendeteksi ketikan keyboard
document.addEventListener('keydown', handleKeyboardInput);

// Fungsi untuk menangani input dari keyboard
function handleKeyboardInput(event) {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        // Jika tombol yang ditekan adalah angka
        appendNumber(key);
    } else if (key === '.') {
        // Jika tombol yang ditekan adalah titik desimal
        appendDecimal();
    } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '%' || key === '^') {
        // Jika tombol yang ditekan adalah operator
        selectOperation(key);
    } else if (key === 'Enter' || key === '=') {
        // Jika tombol yang ditekan adalah enter (untuk menghitung)
        calculate();
    } else if (key === 'Backspace') {
        // Jika tombol yang ditekan adalah backspace (untuk menghapus)
        deleteLast();
    } else if (key === 'c' || key === 'C') {
        // Jika tombol yang ditekan adalah C (untuk menghapus seluruh input)
        clearDisplay();
    }
}

// Fungsi untuk menambahkan angka ke input
function appendNumber(number) {
    currentInput += number;
    updateDisplay();
}

// Fungsi untuk menambahkan titik desimal
function appendDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
    }
}

// Fungsi untuk memilih operator
function selectOperation(op) {
    if (currentInput === '') return;

    if (previousInput !== '') {
        calculate();
    }

    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

// Fungsi untuk melakukan perhitungan
function calculate() {
    let computation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        case '%':
            computation = (prev / 100) * current;
            break;
        case '^':
            computation = Math.pow(prev, current);
            break;
        default:
            return;
    }

    currentInput = computation.toString();
    operator = '';
    previousInput = '';
    updateDisplay();
}

// Fungsi untuk menghapus layar input
function clearDisplay() {
    currentInput = '';
    operator = '';
    previousInput = '';
    updateDisplay();
}

// Fungsi untuk menghapus angka terakhir (backspace)
function deleteLast() {
    currentInput = currentInput.slice(0, -1);  // Menghapus satu karakter terakhir
    updateDisplay();
}

// Fungsi untuk memperbarui tampilan kalkulator
function updateDisplay() {
    document.getElementById('display').value = currentInput;
}
