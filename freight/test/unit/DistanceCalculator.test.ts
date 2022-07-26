import Coordinate from "../../src/domain/entity/Coordinate";
import DistanceCalculator from "../../src/domain/entity/DistanceCalculator";

test("Deve calcular a distância entre duas cidades", function () {
	const from = new Coordinate(-22.9129, -43.2003);
	const to = new Coordinate(-27.5945, -48.5477);
	const distance = DistanceCalculator.calculate(from, to);
	expect(distance).toBe(748.2217780081631);
});
