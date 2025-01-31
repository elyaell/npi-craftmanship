import { IStack } from '../stack';

export class Stack<T> implements IStack<T> {
    private _items: T[] = [];

    push(item: T): void {
        this._items.push(item);
    }

    pop(): T | undefined {
        return this._items.pop();
    }

    peek(): T | undefined {
        return this._items[this._items.length - 1];
    }

    isEmpty(): boolean {
        return this._items.length === 0;
    }

    size(): number {
        return this._items.length;
    }
    
    values() {
        return this._items;
    }
}