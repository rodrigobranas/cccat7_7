import ItemRepositoryDatabase from "../src/ItemRepositoryDatabase";
import ItemRepositoryMemory from "../src/ItemRepositoryMemory";
import OrderService from "../src/OrderService";

test("Deve simular um pedido", async function () {
	// const itemRepository = new ItemRepositoryDatabase();
	const itemRepository = new ItemRepositoryMemory();
	const orderService = new OrderService(itemRepository);
	const output = await orderService.preview({
		cpf: "886.634.854-68",
		orderItems: [
			{ idItem: 1, quantity: 1 },
			{ idItem: 2, quantity: 1 },
			{ idItem: 3, quantity: 3 }
		]
	});
	expect(output.total).toBe(6350);
});
