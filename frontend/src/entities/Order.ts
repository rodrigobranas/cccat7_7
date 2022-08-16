import Item from "./Item";
import OrderItem from "./OrderItem";

export default class Order {
	orderItems: OrderItem[];
	total = 0;

	constructor () {
		this.orderItems = [];
	}

	addItem (item: Item) {
		const orderItem = this.orderItems.find(orderItem => orderItem.idItem === item.idItem);
		if (orderItem) {
			orderItem.quantity++;
		} else {
			this.orderItems.push({ idItem: item.idItem, price: item.price, quantity: 1 });
		}
		this.total += item.price;
	}
	
	removeOrderItem (idItem: number) {
		const existingOrderItem = this.orderItems.find(orderItem => orderItem.idItem === idItem);
		if (!existingOrderItem) return;
		existingOrderItem.quantity--;
		if (existingOrderItem.quantity === 0) {
			this.orderItems.splice(this.orderItems.indexOf(existingOrderItem), 1);
		}
		this.total -= existingOrderItem.price;
	}
}