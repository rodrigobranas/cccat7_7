import Dimension from "../../src/domain/entities/Dimension"

test("Não deve ter largura negativa", function () {
	expect(() => new Dimension(-1, 0, 0, 0)).toThrow(new Error("Invalid dimension"));
});

test("Não deve ter altura negativa", function () {
	expect(() => new Dimension(0, -1, 0, 0)).toThrow(new Error("Invalid dimension"));
});

test("Não deve ter profundidade negativa", function () {
	expect(() => new Dimension(0, 0, -1, 0)).toThrow(new Error("Invalid dimension"));
});

test("Não deve ter peso negativa", function () {
	expect(() => new Dimension(0, 0, 0, -1)).toThrow(new Error("Invalid dimension"));
});