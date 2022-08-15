import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import PreviewOrder from "../../src/application/PreviewOrder";
import GetItemHttpGateway from "../../src/infra/gateway/GetItemHttpGateway";
import GetItemGateway from "../../src/application/gateway/GetItemGateway";
import Item from "../../src/domain/entities/Item";


test("Deve simular um pedido", async function () {
	const connection = new PgPromiseAdapter();
	// const getItemGateway = new GetItemHttpGateway();
	const getItemGateway: GetItemGateway = {
		async execute (idItem: number): Promise<Item> {
			const items: any = {
				1: new Item(1, "Guitarra", 1000, 100, 30, 10, 3, 0.03, 100),
				2: new Item(2, "Amplificador", 5000, 50, 50, 50, 20, 1, 1),
				3: new Item(3, "Cabo", 30, 10, 10, 10, 1, 1, 1)
			};
			return items[idItem];
		}
	}
	const previewOrder = new PreviewOrder(getItemGateway);
	const output = await previewOrder.execute({
		cpf: "886.634.854-68",
		orderItems: [
			{ idItem: 1, quantity: 1 },
			{ idItem: 2, quantity: 1 },
			{ idItem: 3, quantity: 3 }
		]
	});
	expect(output.total).toBe(6090);
	await connection.close();
});
