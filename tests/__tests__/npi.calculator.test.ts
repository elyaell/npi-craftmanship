import { test, expect } from "@jest/globals"
import { CalculatorNPI } from '../../src/services/impl/npi.calculator'; // Adjust the import path as necessary

test('Quand un entrant est ajouté, il est ajouté à la pile', () => {
    var npi = new CalculatorNPI();
    npi.push("2");
    expect(npi.stack().peek()).toEqual("2");
})

test('Si calcul avec 0 entrée, alors résultat 0', () => {
    var npi = new CalculatorNPI();
    npi.calculate();
    expect(npi.total()).toEqual(0)
})

test('Si calcul avec 1 entrée, alors résultat est l\'entrée', () => {
    var npi = new CalculatorNPI();
    npi.push("1");
    npi.calculate();
    expect(npi.total()).toEqual(1)
})

test('Si le calcul est fait avec un entrant négatif seul, alors le résultat est cette valeur', () => {
    var npi = new CalculatorNPI();
    npi.push("-1")
    npi.calculate();
    expect(npi.total()).toEqual(-1)
})

test('Si le calcul est fait avec un entrant à virgule seul, alors le résultat est cette valeur', () => {
    var npi = new CalculatorNPI();
    npi.push("1.3")
    npi.calculate();
    expect(npi.total()).toEqual(1.3)
})

test('Si le calcul est fait avec un symbole seul, alors erreur', () => {
    var npi = new CalculatorNPI();
    npi.push("+")
    expect(() => npi.calculate()).toThrowError("Erreur de calcul")
})

test('Si un entrant n\'est ni un chiffre ni un symbole autorisé, alors erreur', () => {
    var npi = new CalculatorNPI();
    expect(() => npi.push("a")).toThrowError("Entrée invalide")
})

test('Si calcul avec 2 chiffres et un 1 symbole +, alors on exécute le calcul', () => {
    var npi = new CalculatorNPI();
    npi.push("3");
    npi.push("4");
    npi.push("+");
    npi.calculate();
    expect(npi.total()).toEqual(7)
})

test('Après calcul, alors il n\'y a plus qu\'un élément dans la pile', () => {
    var npi = new CalculatorNPI();
    npi.push("4");
    npi.push("2");
    npi.push("+");
    npi.calculate();
    expect(npi.stack().size()).toEqual(1)
})

test('Après calcul, alors il n\'y a plus que le résultat dans la pile', () => {
    var npi = new CalculatorNPI();
    npi.push("4");
    npi.push("2");
    npi.push("+");
    npi.calculate();
    expect(npi.stack().values()).toEqual(["6"])
})

test('Si calcul avec 2 chiffres et un 1 symbole -, alors on exécute le calcul', () => {
    var npi = new CalculatorNPI();
    npi.push("4");
    npi.push("3");
    npi.push("-");
    npi.calculate();
    expect(npi.total()).toEqual(1)
})

test('Si calcul avec 2 chiffres et un 1 symbole *, alors on exécute le calcul', () => {
    var npi = new CalculatorNPI();
    npi.push("3");
    npi.push("4");
    npi.push("*");
    npi.calculate();
    expect(npi.total()).toEqual(12)
})

test('Si calcul avec 2 chiffres et un 1 symbole /, alors on exécute le calcul', () => {
    var npi = new CalculatorNPI();
    npi.push("4");
    npi.push("2");
    npi.push("/");
    npi.calculate();
    expect(npi.total()).toEqual(2)
})


test('Si calcul avec 3 chiffres et 2 symboles, alors on exécute le calcul', () => {
    var npi = new CalculatorNPI();
    npi.push("2");
    npi.push("4");
    npi.push("3");
    npi.push("+");
    npi.push("*");
    npi.calculate();
    expect(npi.total()).toEqual(14)
})

test('Quand un entrant est ajouté, il sera le premier retiré', () => {
    var npi = new CalculatorNPI();
    npi.push("1");
    npi.push("2");
    expect(npi.stack().pop()).toEqual("2");
})

test('Si un entrant dépasse la valeur max du type utilisé, alors erreur', () => {
    const npi = new CalculatorNPI();
    expect(() => npi.push((Number.MAX_SAFE_INTEGER + 1).toString())).toThrow("Erreur de calcul");
});

test('Si le résultat dépasse la valeur max du type utilisé, alors erreur', () => {
    const npi = new CalculatorNPI();
    const maxValue = Number.MAX_SAFE_INTEGER.toString();
    npi.push(maxValue);
    npi.push("1");
    npi.push("+");
    expect(() => npi.calculate()).toThrow("Erreur de calcul");
});

test('Si on fait une / par 0, alors erreur', () => {
    const npi = new CalculatorNPI();
    npi.push("4");
    npi.push("0");
    npi.push("/");
    expect(() => npi.calculate()).toThrow("Erreur de calcul");
});

test('Si l\'opération est en préfixe, alors erreur', () => {
    const npi = new CalculatorNPI();
    npi.push("+");
    npi.push("1");
    npi.push("2");
    expect(() => npi.calculate()).toThrow("Erreur de calcul");
});

test('Si l\'opération est en infixe, alors erreur', () => {
    const npi = new CalculatorNPI();
    npi.push("1");
    npi.push("+");
    npi.push("2");
    expect(() => npi.calculate()).toThrow("Erreur de calcul");
});

test('S\'il n\'y a que des chiffres, alors erreur', () => {
    const npi = new CalculatorNPI();
    npi.push("1");
    npi.push("2");
    expect(() => npi.calculate()).toThrow("Erreur de calcul");
});

test('S\'il n\'y a que des symboles, alors erreur', () => {
    const npi = new CalculatorNPI();
    npi.push("+");
    npi.push("-");
    expect(() => npi.calculate()).toThrow("Erreur de calcul");
});

test('S\'il n\'y a qu\'un seul symbole dans l\'opération, erreur', () => {
    const npi = new CalculatorNPI();
    npi.push("+");
    expect(() => npi.calculate()).toThrow("Erreur de calcul");
});

test('S\'il n\'y a qu\'un chiffre et un symbole dans l\'opération (+-*/), erreur', () => {
    const npi = new CalculatorNPI();
    npi.push("1");
    npi.push("+");
    expect(() => npi.calculate()).toThrow("Erreur de calcul");
});


test('Division non commutative : si a/b alors résultat différent de b/a', () => {
    const npi_1 = new CalculatorNPI();
    npi_1.push("3");
    npi_1.push("4");
    npi_1.push("/");
    npi_1.calculate();
    const npi_2 = new CalculatorNPI();
    npi_2.push("4");
    npi_2.push("3");
    npi_2.push("/");
    npi_2.calculate();
    expect(npi_1.total()).not.toEqual(npi_2.total());
});

test('Soustraction non commutative : si a/b alors résultat différent de b/a', () => {
    const npi_1 = new CalculatorNPI();
    npi_1.push("3");
    npi_1.push("4");
    npi_1.push("/");
    npi_1.calculate();
    const npi_2 = new CalculatorNPI();
    npi_2.push("4");
    npi_2.push("3");
    npi_2.push("/");
    npi_2.calculate();
    expect(npi_1.total()).not.toEqual(npi_2.total());
});

test('Addition commutative : si a+b alors même résultat que b+a', () => {
    const npi_1 = new CalculatorNPI();
    npi_1.push("3");
    npi_1.push("4");
    npi_1.push("+");
    npi_1.calculate();
    const npi_2 = new CalculatorNPI();
    npi_2.push("4");
    npi_2.push("3");
    npi_2.push("+");
    npi_2.calculate();
    expect(npi_1.total()).toEqual(npi_2.total());
});

test('Multiplication commutative : si a*b alors même résultat que b*a', () => {
    const npi_1 = new CalculatorNPI();
    npi_1.push("3");
    npi_1.push("4");
    npi_1.push("*");
    npi_1.calculate();
    const npi_2 = new CalculatorNPI();
    npi_2.push("4");
    npi_2.push("3");
    npi_2.push("*");
    npi_2.calculate();
    expect(npi_1.total()).toEqual(npi_2.total());
});

test('Calcul complexe en CalculatorNPI', () => {
    const npi = new CalculatorNPI();
    npi.push("3");
    npi.push("4");
    npi.push("+");
    npi.push("2");
    npi.push("1");
    npi.push("-");
    npi.push("*");
    npi.push("2");
    npi.push("/");
    npi.calculate();
    expect(npi.total()).toEqual(3.5); // (3 + 4) * (2 - 1) / 2 = 7 * 1 / 2 = 3.5
});


test('Si un entrante est inf à la valeur min du type utilisé, alors erreur', () => {
    const npi = new CalculatorNPI();
    expect(() => npi.push((Number.MIN_SAFE_INTEGER - 1).toString())).toThrow("Erreur de calcul");
});

test('Si le résultat est inf à la valeur min du type utilisé, alors erreur', () => {
    const npi = new CalculatorNPI();
    const minValue = Number.MIN_SAFE_INTEGER.toString();
    npi.push(minValue);
    npi.push("1");
    npi.push("-");
    expect(() => npi.calculate()).toThrow("Erreur de calcul");
});

test('Si un entrant est un factoriel, alors le factoriel est calculé', () => {
    const npi = new CalculatorNPI();
    npi.push("4");
    npi.push("!");
    npi.calculate();
    expect(npi.total()).toEqual(24);
});

test('Si une expression est NPI avec factoriel correct, alors expression calculée', () => {
    const npi = new CalculatorNPI();
    npi.push("3");
    npi.push("4");
    npi.push("!");
    npi.push("+");
    npi.calculate();
    expect(npi.total()).toEqual(27);
});