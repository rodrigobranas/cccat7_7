import OrderRepository from "../domain/repository/OrderRepository"
import GetItemGateway from "./gateway/GetItemGateway"

// API Composition
export default class GetOrder1 {

	constructor (
		readonly orderRepository: OrderRepository, 
		readonly getItemGateway: GetItemGateway,
	) {
	}

	async execute (input: Input): Promise<Output> {
		let order;
		if (input.code) {
			order = await this.orderRepository.get(input.code);
		}
		if (input.guid) {
			order = await this.orderRepository.getByGuid(input.guid);
		}
		if (!order) throw new Error("Order not found");
		const output: Output = {
			code: order.getCode(),
			cpf: order.cpf.getValue(),
			orderItems: [],
			freight: order.freight,
			discount: 0,
			total: order.getTotal()
		}
		for (const orderItem of order.orderItems) {
			const item = await this.getItemGateway.execute(orderItem.idItem);
			output.orderItems.push({ idItem: orderItem.idItem, description: item.description, price: orderItem.price, quantity: orderItem.quantity });
		}
		return output;
	}
}

type Input = {
	guid?: string,
	code?: string
}

type Output = {
	code: string,
	cpf: string,
	orderItems: { idItem: number, description: string, price: number, quantity: number }[],
	freight: number,
	discount: number,
	total: number
}
