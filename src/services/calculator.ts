export interface ICalculator {
    push(value: string): void;
    calculate(): void;
    total(): number;
}