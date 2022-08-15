import Order from "../../domain/entities/Order";
import OrderPlaced from "../../domain/event/OrderPlaced";
import OrderRepository from "../../domain/repository/OrderRepository";
import Queue from "../../infra/queue/Queue";
import CalculateFreightGateway from "../gateway/CalculateFreightGateway";
import DecrementStockGateway from "../gateway/DecrementStockGateway";
import GetItemGateway from "../gateway/GetItemGateway";

export default class CheckoutHandler {

	constructor (
		readonly orderRepository: OrderRepository, 
		readonly calculateFreightGateway: CalculateFreightGateway,
		readonly decrementStockGateway: DecrementStockGateway,
		readonly getItemGateway: GetItemGateway,
		readonly queue: Queue
	) {
	}

	async execute (input: Input): Promise<void> {
		const sequence = await this.orderRepository.count() + 1;
		const order = new Order(input.cpf, input.date, sequence);
		order.guid = input.guid;
		const orderItemsFreight = [];
		const orderItemsStock = [];
		for (const orderItem of input.orderItems) {
			const item = await this.getItemGateway.execute(orderItem.idItem);
			order.addItem(item, orderItem.quantity);
			orderItemsFreight.push({ volume: item.volume, density: item.density, quantity: orderItem.quantity });
			orderItemsStock.push({ idItem: orderItem.idItem, quantity: orderItem.quantity });
		}
		const freight = await this.calculateFreightGateway.calculate({ from: input.from, to: input.to, orderItems: orderItemsFreight });
		order.freight = freight.total;
		await this.orderRepository.save(order);
		await this.queue.publish(new OrderPlaced(order.getCode(), orderItemsStock));
	}
}

type Input = {
	guid?: string,
	from: string,
	to: string,
	cpf: string,
	date: Date,
	orderItems: { idItem: number, quantity: number }[]
}
