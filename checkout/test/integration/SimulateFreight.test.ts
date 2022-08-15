import CalculateFreightGateway, { Input, Output } from "../../src/application/gateway/CalculateFreightGateway";
import GetItemGateway from "../../src/application/gateway/GetItemGateway";
import SimulateFreight from "../../src/application/SimulateFreight";
import Item from "../../src/domain/entities/Item";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import CalculateFreightHttpGateway from "../../src/infra/gateway/CalculateFreightHttpGateway";
import GetItemHttpGateway from "../../src/infra/gateway/GetItemHttpGateway";

test("Deve simular o frete", async function () {
	const connection = new PgPromiseAdapter();
	// const calculateFreightGateway = new CalculateFreightHttpGateway();
	const calculateFreightGateway: CalculateFreightGateway = { 
		async calculate(input: Input) {
			return {
				total: 202.09
			};
		}
	};
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
	const simulateFreight = new SimulateFreight(calculateFreightGateway, getItemGateway);
	const output = await simulateFreight.execute({
		from: "22060030",
		to: "88015600",
		orderItems: [
			{ idItem: 1, quantity: 1 },
			{ idItem: 2, quantity: 1 },
			{ idItem: 3, quantity: 3 }
		]
	});
	expect(output.total).toBe(202.09);
	await connection.close();
});