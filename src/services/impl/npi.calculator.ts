import { ICalculator } from "../calculator";
import { IStack } from "../../models/stack";
import { Stack } from "../../models/impl/stack.impl";

export class CalculatorNPI implements ICalculator {

    private _stack: IStack<string> = new Stack<string>();
    private _total: number = 0;

    stack() {
        return this._stack;
    }

    values(): string[] {
        return this._stack.values();
    }

    total() {
        return this._total;
    }
    removeLast(): void {
        this._stack.pop();
    }

    clear() {
        this._stack = new Stack<string>();
    }

    // Ajoute un element à la pile
    push(value: string): void {
        if (!this.isValidInput(value)) {
            throw new Error("Entrée invalide");
        }
        this.checkSafeInteger(parseFloat(value));
        this._stack.push(value);
    }

    private isValidInput(value: string) {
        const valid = ["+", "-", "*", "/", "!"];
        return !isNaN(parseFloat(value)) || valid.includes(value);
    }

    private checkSafeInteger(value: number): void {
        if (value > Number.MAX_SAFE_INTEGER || value < Number.MIN_SAFE_INTEGER) {
            throw new Error("Erreur de calcul");
        }
    }

    private executeOperation(): string {
        const element = this._stack.pop() ?? undefined;
        if (element === undefined) {
            return "";
        }
        if (!isNaN(parseFloat(element))) {
            return element;
        }

        if (element === "!") {
            const a = this.executeOperation();
            const total = this.factorial(parseInt(a));
            this.checkSafeInteger(total);
            return total.toString();
        }

        const b = this.executeOperation();
        const a = this.executeOperation();
        let total = 0;

        if (["+", "-", "*", "/"].includes(element) && (b === "" || a === "")) { 
            throw new Error("Erreur de calcul");
        }

        switch (element) {
            case "+":
                total = parseFloat(a) + parseFloat(b);
                break;
            case "-":
                total = parseFloat(a) - parseFloat(b);
                break;
            case "*":
                total = parseFloat(a) * parseFloat(b);
                break;
            case "/":
                if (b === "0") {
                    throw new Error("Erreur de calcul");
                }
                total = parseFloat(a) / parseFloat(b);
                break;
            default:
                throw new Error("Erreur de calcul");
        }

        this.checkSafeInteger(total);

        return total.toString();
    }

    calculate(): void {
        if (this._stack.size() === 0) {
            this._total = 0;
            return;
        }

        if (this._stack.size() === 1) {
            const element = this._stack.pop() ?? "0";
            if (isNaN(parseFloat(element))) {
                throw new Error("Erreur de calcul");
            }
            this._total = parseFloat(element);
            return;
        }

        this._total = parseFloat(this.executeOperation());
        this._total = parseFloat(this._total.toFixed(5));
        this._stack.push(this._total.toString());
        if (this._stack.size() !== 1) {
            throw new Error("Erreur de calcul");
        }
    }

    private factorial(n: number): number {
        if (n < 0) {
            throw new Error("Erreur de calcul");
        }
        if (n === 0 || n === 1) {
            return 1;
        }
        return n * this.factorial(n - 1);
    }

}