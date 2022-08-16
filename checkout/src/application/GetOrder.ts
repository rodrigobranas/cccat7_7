import OrderRepository from "../domain/repository/OrderRepository";
import GetItemGateway from "./gateway/GetItemGateway";

export default class GetOrder {

	constructor (readonly orderRepository: OrderRepository, readonly getItemGateway: GetItemGateway) {
	}

	async execute (guid: string): Promise<Output> {
		const order = await this.orderRepository.getByGuid(guid);
		const output: Output = {
			total: order.getTotal(),
			orderItems: []
		}
		for (const orderItem of order.orderItems) {
			const item = await this.getItemGateway.execute(orderItem.idItem);
			output.orderItems.push({ idItem: orderItem.idItem, description: item.description, price: orderItem.price, quantity: orderItem.quantity });
		}
		return output;
	}
}

type Output = {
	total: number,
	orderItems: {
		idItem: number,
		description: string,
		price: number,
		quantity: number
	}[]
}