const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const allClearButtons = document.querySelector('[data-all-clear]');
const deleteButtons = document.querySelector('[data-delete]');
const previousOperandText = document.querySelector('[data-previous-operand]');
const currentOperandText = document.querySelector('[data-current-operand]');
const equalOperand = document.querySelector('[data-equal]');

class Calculator {
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
    }
    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = '';
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    chooseOperations(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    compute() {
        let computation;
        const previous = parseFloat(this.previousOperand);
        console.log(previous);
        const current = parseFloat(this.currentOperand);
        console.log(current);
        if (isNaN(previous) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = previous + current;
                break;
            case '-':
                computation = previous - current;
                break;
            case '*':
                computation = previous * current;
                break;
            case '÷':
                computation = previous / current;
                break;
            default:
                return
        }
        this.currentOperand = computation;
        this.operation = '';
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        const stringnum = number.toString();
        console.log(stringnum);
        const intigernum = parseFloat(stringnum.split('.')[0]);
        console.log(intigernum);
        const desimalnum = stringnum.split('.')[1];
        console.log(desimalnum);
        let intigerDispaly;
        if (isNaN(intigernum)) {
            intigerDispaly = ''
        } else {
            intigerDispaly = intigernum.toLocaleString('en-US')
        }
        if (desimalnum != null) {
            return `${intigerDispaly}.${desimalnum}`
        } else {
            return intigerDispaly;
        }
    }

    updateDisplay() {
        this.currentOperandText.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation !== null) {
            this.previousOperandText.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandText.innerText = '';
        }

    }
}

const calculator = new Calculator(previousOperandText, currentOperandText);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log(button.innerText);
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log(button.innerText);
        calculator.chooseOperations(button.innerText);
        calculator.updateDisplay();
    })
})

equalOperand.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButtons.addEventListener('click', () => {
    console.log('fasdgs');
    calculator.clear();
    calculator.updateDisplay();
});

deleteButtons.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});