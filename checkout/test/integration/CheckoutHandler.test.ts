import CheckoutHandler from "../../src/application/handler/CheckoutHandler";
import * as CalculateFreightGateway from "../../src/application/gateway/CalculateFreightGateway";
import * as DecrementStockGateway from "../../src/application/gateway/DecrementStockGateway";
import GetItemGateway from "../../src/application/gateway/GetItemGateway";
import Item from "../../src/domain/entities/Item";
import DomainEvent from "../../src/domain/event/DomainEvent";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import Queue from "../../src/infra/queue/Queue";
import OrderRepositoryDatabase from "../../src/infra/repository/database/OrderRepositoryDatabase";
import GetOrder from "../../src/application/GetOrder";
import OrderQuery from "../../src/infra/query/OrderQuery";
import GetOrder2 from "../../src/application/GetOrder2";
import OrderProjectionHandler from "../../src/application/handler/OrderProjectionHandler";
import GetOrder3 from "../../src/application/GetOrder3";

test("Deve fazer um pedido", async function () {
	const queue: Queue = {
		async connect (): Promise<void> {
		},
		async close (): Promise<void> {
		},
		async consume (eventName: string, callback: Function): Promise<void> {
		},
		async publish (domainEvent: DomainEvent): Promise<void> {
		}
	}
	const connection = new PgPromiseAdapter();
	const orderRepository = new OrderRepositoryDatabase(connection);
	await orderRepository.clean();
	const calculateFreightGateway: CalculateFreightGateway.default = { 
		async calculate(input: CalculateFreightGateway.Input) {
			return {
				total: 202.09
			};
		}
	};
	const decrementStockGateway: DecrementStockGateway.default = {
		async decrement (input: DecrementStockGateway.Input): Promise<void> {
		}
	};
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
	const guid = (Math.random() + 1).toString(36).substring(7);
	const checkout = new CheckoutHandler(orderRepository, calculateFreightGateway, decrementStockGateway, getItemGateway, queue);
	await checkout.execute({
		guid,
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
	// API Composition - acoplamento
	// const getOrder = new GetOrder(orderRepository, getItemGateway);
	// const output = await getOrder.execute(guid);
	// Query - acoplamento
	const orderQuery = new OrderQuery(connection);
	// const getOrder2 = new GetOrder2(orderQuery);
	// const output = await getOrder2.execute(guid);
	// expect(output.total).toBe('6292.09')
	const orderProjectionHandler = new OrderProjectionHandler(orderQuery, getItemGateway);
	await orderProjectionHandler.execute({ guid });
	const getOrder3 = new GetOrder3(orderQuery);
	const output = await getOrder3.execute(guid);
	console.log(output.data.orderItems);
	await connection.close();
});
