import CalculateFreightGateway from "./gateway/CalculateFreightGateway";
import GetItemGateway from "./gateway/GetItemGateway";
// use case
export default class SimulateFreight {

	constructor (
		readonly calculateFreightGateway: CalculateFreightGateway,
		readonly getItemGateway: GetItemGateway
	) {
	}

	async execute (input: Input): Promise<Output> {
		const orderItems = [];
		for (const orderItem of input.orderItems) {
			const item = await this.getItemGateway.execute(orderItem.idItem);
			orderItems.push({ volume: item.volume, density: item.density, quantity: orderItem.quantity });
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