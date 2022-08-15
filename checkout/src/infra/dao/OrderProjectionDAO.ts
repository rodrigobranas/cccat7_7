import Connection from "../database/Connection";

export default class OrderProjectionDAO {

	constructor (readonly connection: Connection) {
	}

	async save (guid: string, orderProjection: any) {
		await this.connection.query("insert into ccca.order_projection (guid, data) values ($1, $2)", [guid, orderProjection]);
	}

	async get (guid: string) {
		const [orderData] = await this.connection.query("select * from ccca.order_projection where guid = $1", [guid]);
		if (!orderData) throw new Error("Order not found");
		return orderData.data;
	}
}
