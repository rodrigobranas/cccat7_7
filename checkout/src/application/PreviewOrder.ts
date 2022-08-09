import Order from "../domain/entities/Order";
import GetItemGateway from "./gateway/GetItemGateway";
// use case
export default class PreviewOrder {

	constructor (readonly getItemGateway: GetItemGateway) {
	}

	async execute (input: Input): Promise<Output> {
		const order = new Order(input.cpf);
		for (const orderItem of input.orderItems) {
			const item = await this.getItemGateway.execute(orderItem.idItem);
			order.addItem(item, orderItem.quantity);
		}
		const total = order.getTotal();
		return {
			total
		};
	}
}

type Input = {
	cpf: string,
	orderItems: { idItem: number, quantity: number }[]
}

type Output = {
	total: number
}