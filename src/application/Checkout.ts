import Order from "../domain/entities/Order";
import ItemRepository from "../domain/repository/ItemRepository";
import OrderRepository from "../domain/repository/OrderRepository";
// use case
export default class Checkout {

	constructor (readonly itemRepository: ItemRepository, readonly orderRepository: OrderRepository) {
	}

	async execute (input: Input): Promise<Output> {
		const sequence = await this.orderRepository.count() + 1;
		const order = new Order(input.cpf, input.date, sequence);
		for (const orderItem of input.orderItems) {
			const item = await this.itemRepository.getItem(orderItem.idItem);
			order.addItem(item, orderItem.quantity);
		}
		await this.orderRepository.save(order);
		const total = order.getTotal();
		return {
			code: order.getCode(),
			total
		};
	}
}

type Input = {
	cpf: string,
	date: Date,
	orderItems: { idItem: number, quantity: number }[]
}

type Output = {
	code: string,
	total: number
}