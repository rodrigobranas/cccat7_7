import Checkout from "../../src/application/Checkout";
import * as CalculateFreightGateway from "../../src/application/gateway/CalculateFreightGateway";
import * as DecrementStockGateway from "../../src/application/gateway/DecrementStockGateway";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import CalculateFreightHttpGateway from "../../src/infra/gateway/CalculateFreightHttpGateway";
import ItemRepositoryDatabase from "../../src/infra/repository/database/ItemRepositoryDatabase";
import OrderRepositoryDatabase from "../../src/infra/repository/database/OrderRepositoryDatabase";

test("Deve fazer um pedido", async function () {
	const connection = new PgPromiseAdapter();
	const itemRepository = new ItemRepositoryDatabase(connection);
	const orderRepository = new OrderRepositoryDatabase(connection);
	await orderRepository.clean();
	// const calculateFreightGateway = new CalculateFreightHttpGateway();
	const calculateFreightGateway: CalculateFreightGateway.default = { 
		async calculate(input: CalculateFreightGateway.Input) {
			return {
				total: 202.09
			};
		}
	};
	const decrementStockGateway: DecrementStockGateway.default = {
		async decrement (input: DecrementStockGateway.Input): Promise<void> {
			console.log("OK");
		}
	};
	const checkout = new Checkout(itemRepository, orderRepository, calculateFreightGateway, decrementStockGateway);
	const output = await checkout.execute({
		from: "22060030",
		to: "88015600",
		cpf: "886.634.854-68",
		orderItems: [
			{ idItem: 1, quantity: 1 },
			{ idItem: 2, quantity: 1 },
			{ idItem: 3, quantity: 3 }
		],
		date: new Date("2022-03-01T10:00:00")
	});
	expect(output.total).toBe(6292.09);
	expect(output.code).toBe("202200000001");
	await connection.close();
});
