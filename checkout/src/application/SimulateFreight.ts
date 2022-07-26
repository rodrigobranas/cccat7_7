import ItemRepository from "../domain/repository/ItemRepository";
import CalculateFreightGateway from "./gateway/CalculateFreightGateway";
// use case
export default class SimulateFreight {

	constructor (readonly itemRepository: ItemRepository, readonly calculateFreightGateway: CalculateFreightGateway) {
	}

	async execute (input: Input): Promise<Output> {
		const orderItems = [];
		for (const orderItem of input.orderItems) {
			const item = await this.itemRepository.getItem(orderItem.idItem);
			orderItems.push({ volume: item.getVolume(), density: item.getDensity(), quantity: orderItem.quantity });
		}
		const output = await this.calculateFreightGateway.calculate({ from: input.from, to: input.to, orderItems });
		return {
			total: output.total
		}
	}
}

type Input = {
	from: string,
	to: string,
	orderItems: { idItem: number, quantity: number }[]
}

type Output = {
	total: number
}