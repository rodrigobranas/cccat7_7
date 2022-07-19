import Checkout from "../../src/application/Checkout";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import ItemRepositoryDatabase from "../../src/infra/repository/database/ItemRepositoryDatabase";
import OrderRepositoryDatabase from "../../src/infra/repository/database/OrderRepositoryDatabase";

test("Deve fazer um pedido", async function () {
	const connection = new PgPromiseAdapter();
	const itemRepository = new ItemRepositoryDatabase(connection);
	const orderRepository = new OrderRepositoryDatabase(connection);
	await orderRepository.clean();
	const checkout = new Checkout(itemRepository, orderRepository);
	const output = await checkout.execute({
		cpf: "886.634.854-68",
		orderItems: [
			{ idItem: 1, quantity: 1 },
			{ idItem: 2, quantity: 1 },
			{ idItem: 3, quantity: 3 }
		],
		date: new Date("2022-03-01T10:00:00")
	});
	expect(output.total).toBe(6350);
	expect(output.code).toBe("202200000001");
	await connection.close();
});
