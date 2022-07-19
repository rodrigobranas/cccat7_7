import SimulateFreight from "../../src/application/SimulateFreight";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import ItemRepositoryDatabase from "../../src/infra/repository/database/ItemRepositoryDatabase";

test("Deve simular o frete", async function () {
	const connection = new PgPromiseAdapter();
	const itemRepository = new ItemRepositoryDatabase(connection);
	const simulateFreight = new SimulateFreight(itemRepository);
	const output = await simulateFreight.execute({
		orderItems: [
			{ idItem: 1, quantity: 1 },
			{ idItem: 2, quantity: 1 },
			{ idItem: 3, quantity: 3 }
		]
	});
	expect(output.total).toBe(260);
	await connection.close();
});