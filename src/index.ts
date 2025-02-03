import { ICalculator } from "./services/calculator";
import { CalculatorNPI } from "./services/impl/npi.calculator";

const npi: ICalculator = new CalculatorNPI();

let tempExpression: string = "";
let isNegative = false;
let history: { expression: string, result: number }[] = [];


export function addToValue(value: string) {
    tempExpression += value;
    let temp = (isNegative ? "-" : "") + tempExpression;
    (document.getElementById('display') as HTMLElement).innerText = temp;
}

export function getNpi(): ICalculator {
    return npi;
}

export function addToStack(value: string): void {
    if (tempExpression !== "") {
        if (isNegative) {
            tempExpression = "-" + tempExpression;
        }
        npi.push(tempExpression);
    }
    isNegative = false;
    tempExpression = "";
    if (value !== "") {
        npi.push(value);
    }
    updateCurrentExp();
}

export function removeLast(): void {
    npi.removeLast();
    updateCurrentExp();
}

export function clearStack(): void {
    tempExpression = "";
    npi.clear();
    updateCurrentExp();
}

export function calculateStack(): void {
    try {
        let expression = npi.values().join(" ");
        npi.calculate();
        updateCurrentExp();
        addToHistory(expression, npi.total());
    } catch (e) {
        (document.getElementById('display') as HTMLElement).innerText = "Error";
    }
    clearStack();
}

export function nextIsNegative(): void {
    isNegative = !isNegative;
    let temp = (isNegative ? "-" : "") + tempExpression;
    (document.getElementById('display') as HTMLElement).innerText = temp;
}

export function updateCurrentExp(): void {
    let temp = npi.values().join(" ");
    temp += " ";
    temp += (isNegative ? "-" : "") + tempExpression;
    (document.getElementById('display') as HTMLElement).innerText = "";
    (document.getElementById('current') as HTMLElement).innerText = temp;
}

export function addToHistory(expr: string, result: number): void {
    history.unshift({ expression: expr, result });
    if (history.length > 10) {
        history.pop();
    }
    updateHistoryDisplay();
}

export function updateHistoryDisplay(): void {
    const historyList = document.getElementById('history-list') as HTMLElement;
    historyList.innerHTML = '';
    history.forEach(item => {
        const li = document.createElement('li');
        li.innerText = `${item.expression} = ${item.result}`;
        historyList.appendChild(li);
    });
}

// Attach export functions to the window object
(window as any).addToValue = addToValue;
(window as any).addToStack = addToStack;
(window as any).calculateStack = calculateStack;
(window as any).clearStack = clearStack;
(window as any).removeLast = removeLast;
(window as any).nextIsNegative = nextIsNegative;
