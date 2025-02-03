import { ICalculator } from "./services/calculator";
import { CalculatorNPI } from "./services/impl/npi.calculator";

let expression : string[] = [];
const npi : ICalculator = new CalculatorNPI();

function addToStack(value: string): void {
    npi.push(value); 
}

function clearStack() : void {
    expression = [];
}

function calculateStack() : void {
    npi.calculate();
    console.log(npi.total());
}

// Attach functions to the window object
(window as any).addToStack = addToStack;
(window as any).calculateStack = calculateStack;
(window as any).clearStack = clearStack;