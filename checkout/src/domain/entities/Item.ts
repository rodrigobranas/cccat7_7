import Dimension from "./Dimension";
import OrderItem from "./OrderItem";

export default class Item {

	constructor (readonly idItem: number, readonly description: string, readonly price: number, readonly dimension: Dimension = new Dimension(0, 0, 0, 0)) {
	}

	getVolume () {
		return this.dimension.getVolume();
	}

	getDensity () {
		return this.dimension.getDensity();
	}

	createOrderItem (quantity: number) {
		return new OrderItem(this.idItem, this.price, quantity)
	}
}
