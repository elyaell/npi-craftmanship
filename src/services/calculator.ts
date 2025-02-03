export interface ICalculator {
    removeLast(): void;
    values(): string[];
    push(value: string): void;
    calculate(): void;
    total(): number;
    clear(): void;
}