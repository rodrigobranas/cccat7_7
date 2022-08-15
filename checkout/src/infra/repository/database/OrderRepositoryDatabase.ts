import Coupon from "../../../domain/entities/Coupon";
import Order from "../../../domain/entities/Order";
import OrderCoupon from "../../../domain/entities/OrderCoupon";
import OrderItem from "../../../domain/entities/OrderItem";
import OrderRepository from "../../../domain/repository/OrderRepository";
import Connection from "../../database/Connection";

export default class OrderRepositoryDatabase implements OrderRepository {

	constructor (readonly connection: Connection) {
	}

	async save(order: Order): Promise<void> {
		const [orderData] = await this.connection.query("insert into ccca.order (code, cpf, issue_date, total, freight, sequence, guid) values ($1, $2, $3, $4, $5, $6, $7) returning *", [order.getCode(), order.cpf.getValue(), order.date, order.getTotal(), order.freight, order.sequence, order.guid]);
		for (const orderItem of order.orderItems) {
			await this.connection.query("insert into ccca.order_item (id_order, id_item, price, quantity) values ($1, $2, $3, $4)", [orderData.id_order, orderItem.idItem, orderItem.price, orderItem.quantity]);
		}
	}

	async count(): Promise<number> {
		const [row] = await this.connection.query("select count(*)::int from ccca.order", []);
		return row.count;
	}

	async get(code: string): Promise<Order> {
		const [orderData] = await this.connection.query("select * from ccca.order where code = $1", [code]);
		if (!orderData) throw new Error("Order not found");
		const order = new Order(orderData.cpf, new Date(orderData.issue_date), orderData.sequence);
		const orderItemsData = await this.connection.query("select * from ccca.order_item where id_order = $1", [orderData.id_order]);
		for (const orderItemData of orderItemsData) {
			const orderItem = new OrderItem(orderItemData.id_item, parseFloat(orderItemData.price), orderItemData.quantity);
			order.orderItems.push(orderItem);
		}
		order.coupon = new OrderCoupon(orderData.coupon_code, orderData.coupon_percentage);
		order.freight = parseFloat(orderData.freight);
		return order;
	}

	async getByGuid(guid: string): Promise<Order> {
		const [orderData] = await this.connection.query("select code from ccca.order where guid = $1", [guid]);
		if (!orderData) throw new Error("Order not found");
		return this.get(orderData.code);
	}

	async clean(): Promise<void> {
		await this.connection.query("delete from ccca.order_item", []);
		await this.connection.query("delete from ccca.order", []);
	}
}