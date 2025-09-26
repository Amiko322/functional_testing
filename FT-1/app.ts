document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display") as HTMLInputElement;
    let currentInput = ""; // Текущее число
    let firstOperand: number | null = null; // Первый операнд
    let operator: string | null = null; // Оператор
    let awaitingNextInput = false; // Флаг ожидания следующего числа

    // Обновить дисплей
    const updateDisplay = (value: string) => {
        display.value = value;
    };

    // Очистка
    const clearAll = () => {
        currentInput = "";
        firstOperand = null;
        operator = null;
        awaitingNextInput = false;
        updateDisplay("");
    };

    // Выполнить операцию
    const calculate = (a: number, b: number, operator: string): number => {
        switch (operator) {
            case "add":
                return a + b;
            case "subtract":
                return a - b;
            case "multiply":
                return a * b;
            case "divide":
                return b !== 0 ? a / b : NaN;
            case "power":
                return Math.pow(a, b);
            default:
                return b;
        }
    };

    // Обработка нажатий на кнопки
    const buttons = document.querySelectorAll("button");
    
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const action = button.getAttribute("data-action");
            
            if (!action) return;
            
            if (!isNaN(Number(action))) {
                // Если нажата цифра
                if (awaitingNextInput) {
                    currentInput = action;
                    awaitingNextInput = false;
                } else {
                    currentInput += action;
                }
                updateDisplay(currentInput);
            } else if (action === "clear") {
                clearAll();
            } else if (action === "equals") {
                if (firstOperand !== null && operator) {
                    const secondOperand = parseFloat(currentInput);
                    const result = calculate(firstOperand, secondOperand, operator);
                    updateDisplay(result.toString());
                    currentInput = result.toString();
                    firstOperand = null;
                    operator = null;
                }
            } else if (action === "sqrt") {
                const result = Math.sqrt(parseFloat(currentInput));
                updateDisplay(result.toString());
                currentInput = result.toString();
            } else {
                if (firstOperand === null) {
                    firstOperand = parseFloat(currentInput);
                } else if (operator) {
                    const result = calculate(firstOperand, parseFloat(currentInput), operator);
                    firstOperand = result;
                    updateDisplay(result.toString());
                }
                operator = action;
                awaitingNextInput = true;
            }
        });
    });
});