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
    try {
        if (tempExpression !== "") {
            if (isNegative) {
                tempExpression = "-" + tempExpression;
            }
            npi.push(tempExpression);
            (document.getElementById('display') as HTMLElement).innerText = "";
        }
        isNegative = false;
        tempExpression = "";
        if (value !== "") {
            npi.push(value);
        }
    } catch (e) {
        console.log(e)
        clearStack();
        (document.getElementById('display') as HTMLElement).innerText = "Error é";
    }

    (document.getElementById('current') as HTMLElement).innerText = npi.values().join(" ");
}

export function removeLast(): void {
    npi.removeLast();
    (document.getElementById('current') as HTMLElement).innerText = npi.values().join(" ");
}

export function clearDisplay(): void {
    tempExpression = "";
    isNegative = false;
    (document.getElementById('display') as HTMLElement).innerText = "";
}

export function clearStack(): void {
    tempExpression = "";
    npi.clear();
    (document.getElementById('display') as HTMLElement).innerText = "";
    (document.getElementById('current') as HTMLElement).innerText = npi.values().join(" ");
}

export function calculateStack(): void {
    try {
        if (npi.values().length === 0) {
            return
        }
        const expression = npi.values().join(" ");
        npi.calculate();
        (document.getElementById('current') as HTMLElement).innerText = npi.total().toString();
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
(window as any).clearDisplay = clearDisplay;
(window as any).removeLast = removeLast;
(window as any).nextIsNegative = nextIsNegative;
