import OrderQuery from "../../infra/query/OrderQuery";
import GetItemGateway from "../gateway/GetItemGateway";

export default class OrderProjectionHandler {

	constructor (readonly orderQuery: OrderQuery, readonly getItemGateway: GetItemGateway) {
	}

	async execute (input: { guid: string }): Promise<any> {
		const order = await this.orderQuery.getByGuid2(input.guid);
		for (const orderItem of order.orderItems) {
			const item = await this.getItemGateway.execute(orderItem.id_item);
			orderItem.description = item.description;
		}
		await this.orderQuery.saveOrderProjection(input.guid, order);
	}
}
