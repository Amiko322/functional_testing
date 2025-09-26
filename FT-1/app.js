document.addEventListener("DOMContentLoaded", function () {
    var display = document.getElementById("display");
    var currentInput = ""; // Текущее число
    var firstOperand = null; // Первый операнд
    var operator = null; // Оператор
    var awaitingNextInput = false; // Флаг ожидания следующего числа
    // Обновить дисплей
    var updateDisplay = function (value) {
        display.value = value;
    };
    // Очистка
    var clearAll = function () {
        currentInput = "";
        firstOperand = null;
        operator = null;
        awaitingNextInput = false;
        updateDisplay("");
    };
    // Выполнить операцию
    var calculate = function (a, b, operator) {
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
    var buttons = document.querySelectorAll("button");
    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            var action = button.getAttribute("data-action");
            if (!action)
                return;
            if (!isNaN(Number(action))) {
                // Если нажата цифра
                if (awaitingNextInput) {
                    currentInput = action;
                    awaitingNextInput = false;
                }
                else {
                    currentInput += action;
                }
                updateDisplay(currentInput);
            }
            else if (action === "clear") {
                clearAll();
            }
            else if (action === "equals") {
                if (firstOperand !== null && operator) {
                    var secondOperand = parseFloat(currentInput);
                    var result = calculate(firstOperand, secondOperand, operator);
                    updateDisplay(result.toString());
                    currentInput = result.toString();
                    firstOperand = null;
                    operator = null;
                }
            }
            else if (action === "sqrt") {
                var result = Math.sqrt(parseFloat(currentInput));
                updateDisplay(result.toString());
                currentInput = result.toString();
            }
            else {
                if (firstOperand === null) {
                    firstOperand = parseFloat(currentInput);
                }
                else if (operator) {
                    var result = calculate(firstOperand, parseFloat(currentInput), operator);
                    firstOperand = result;
                    updateDisplay(result.toString());
                }
                operator = action;
                awaitingNextInput = true;
            }
        });
    });
});
