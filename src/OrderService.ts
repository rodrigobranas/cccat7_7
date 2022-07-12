import Order from "./Order";
import ItemRepository from "./ItemRepository";
import OrderRepository from "./OrderRepository";

export default class OrderService {
	// Porta Secundária (Driven)
	constructor (readonly itemRepository: ItemRepository, readonly orderRepository?: OrderRepository) {
	}

	// Porta Primária (Driver)
	async preview (input: Input): Promise<Output> {
		// Entity (Clean Architecture)
		const order = new Order(input.cpf);
		for (const orderItem of input.orderItems) {
			const item = await this.itemRepository.getItem(orderItem.idItem);
			order.addItem(item, orderItem.quantity);
		}
		const total = order.getTotal();
		return {
			total
		};
	}

	// Porta Primária (Driver)
	async checkout (input: Input): Promise<void> {
		const order = new Order(input.cpf);
		for (const orderItem of input.orderItems) {
			const item = await this.itemRepository.getItem(orderItem.idItem);
			order.addItem(item, orderItem.quantity);
		}
		// await this.orderRepository.save(order);
	}
}

type Input = {
	cpf: string,
	orderItems: { idItem: number, quantity: number }[]
}

type Output = {
	total: number
}