import Connection from "../database/Connection";

export default class OrderQuery {

	constructor (readonly connection: Connection) {
	}

	async getByGuid (guid: string) {
		const [orderData] = await this.connection.query("select * from ccca.order where guid = $1", [guid]);
		orderData.orderItems = await this.connection.query("select * from ccca.order_item where id_order = $1", [orderData.id_order]);
		for (const orderItemData of orderData.orderItems) {
			const [itemData] = await this.connection.query("select * from ccca_catalog.item where id_item = $1", [orderItemData.id_item]);
			orderItemData.description = itemData.description;
		}
		return orderData;
	}

	async getByGuid2 (guid: string) {
		const [orderData] = await this.connection.query("select * from ccca.order where guid = $1", [guid]);
		orderData.orderItems = await this.connection.query("select * from ccca.order_item where id_order = $1", [orderData.id_order]);
		return orderData;
	}

	async getProjectionByGuid (guid: string) {
		const [orderData] = await this.connection.query("select * from ccca.order_projection where guid = $1", [guid]);
		return orderData;
	}

	async saveOrderProjection (guid: string, order: any) {
		await this.connection.query("insert into ccca.order_projection (guid, data) values ($1, $2)", [guid, order]);
	}

	// paginação, ordenação, filtros
	async getOrderProjection (guid: string) {
		const [orderData] = await this.connection.query("select * from ccca.order_projection where guid = $1", [guid]);
		return orderData;
	}
}