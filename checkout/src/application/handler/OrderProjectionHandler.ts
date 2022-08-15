import OrderProjectionDAO from "../../infra/dao/OrderProjectionDAO";
import GetItemGateway from "../gateway/GetItemGateway";

export default class OrderProjectionHandler {

	constructor (
		readonly orderProjectionDAO: OrderProjectionDAO,
		readonly getItemGateway: GetItemGateway
	) {
	}

	async execute (input: Input): Promise<void> {
		const orderProjection: any = {
			orderItems: []
		};
		for (const orderItem of input.orderItems) {
			const item = await this.getItemGateway.execute(orderItem.idItem);
			orderProjection.orderItems.push({ idItem: orderItem.idItem, description: item.description, price: item.price, quantity: orderItem.quantity });
		}
		if (input.guid) await this.orderProjectionDAO.save(input.guid, orderProjection);
	}
}

type Input = {
	code?: string,
	guid?: string,
	from: string,
	to: string,
	cpf: string,
	date: Date,
	orderItems: { idItem: number, quantity: number }[]
}
