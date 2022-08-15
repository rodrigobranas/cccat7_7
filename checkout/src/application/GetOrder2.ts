import OrderRepository from "../domain/repository/OrderRepository"
import OrderProjectionDAO from "../infra/dao/OrderProjectionDAO";
import GetItemGateway from "./gateway/GetItemGateway"

// API Composition
export default class GetOrder2 {

	constructor (
		readonly orderProjectionDAO: OrderProjectionDAO
	) {
	}

	async execute (guid: string): Promise<any> {
		const orderData = await this.orderProjectionDAO.get(guid);
		return orderData;
	}
}

type Output = {	
}
