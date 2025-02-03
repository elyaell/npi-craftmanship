// filepath: /c:/Users/softeam2/Documents/npi/npi-craftmanship/tests/__tests__/index.test.ts
import { addToStack, clearStack, removeLast, calculateStack, addToValue, nextIsNegative, getNpi } from '../../src';
import '@testing-library/jest-dom';

fdescribe('NPI Calculator', () => {
    beforeEach(() => {
        clearStack();
        document.body.innerHTML = (globalThis as any).htmlContent;
    });
    afterEach(() => {
        clearStack();
    });
    test('Quand appel addToStack() alors élément ajouté à la pile', () => {
        addToStack("4");
        expect(getNpi().values()).toEqual(["4"]);
    });
    test('Quand appel clearStack() alors la pile NPI est vidée', () => {
        addToStack("4");  
        clearStack();
        expect(getNpi().values()).toEqual([]);
    });
    test('Quand appel removeLast() alors dernier élément retiré de la pile', () => {    
        addToStack("4");
        addToStack("5");
        removeLast();
        expect(getNpi().values()).toEqual(["4"]);
    });
    test('Quand appel calculateStack() alors le contenu de la pile est calculé', () => { 
        addToStack("4");
        addToStack("5");
        addToStack("+");
        calculateStack();
        expect(getNpi().values()).toEqual(["9"]);
    });
    test('Quand appel addToValue() alors élément dans expression temporaire pas ajout dans pile ', () => {
        addToValue("4");
        addToValue("5");
        expect(getNpi().values()).toEqual([]);
    });
    test('Si addToStack() appelé et expression temporaire non vide, alors expression temporaire appelée ', () => {
        addToValue("4");
        addToValue("5");
        addToStack("");
        expect(getNpi().values()).toEqual(["45"]);
    });
    test('Quand nb click impairs nextIsNegative(), alors prochain élément sera négatif', () => {
        nextIsNegative();
        nextIsNegative();
        nextIsNegative();
        addToValue("4");
        addToStack("");
        expect(getNpi().values()).toEqual(["-4"]);
    });
    test('Quand nb click pairs nextIsNegative(), alors prochain élément sera positif', () => {
        nextIsNegative();
        nextIsNegative();
        addToValue("4");
        addToStack("");
        expect(getNpi().values()).toEqual(["4"]);
    });
});
