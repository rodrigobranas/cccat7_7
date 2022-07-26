import CalculateFreight from "../../src/application/CalculateFreight";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import CityRepositoryDatabase from "../../src/infra/repository/CityRepositoryDatabase";

test("Deve calcular a distância entre dois ceps", async function () {
	const input = {
		from: "22060030",
		to: "88015600",
		orderItems: [
			{ 
				volume: 0.03,
				density: 100,
				quantity: 1
			}
		]
	}
	const connection = new PgPromiseAdapter();
	const cityRepository = new CityRepositoryDatabase(connection);
	const calculateFreight = new CalculateFreight(cityRepository);
	const output = await calculateFreight.execute(input);
	expect(output.total).toBe(22.45);
	await connection.close();
});
