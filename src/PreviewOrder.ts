import Item from "./Item";
import Order from "./Order";
import pgp from "pg-promise";
import Dimension from "./Dimension";

export default class PreviewOrder {

	constructor () {
	}

	async execute (input: Input): Promise<Output> {
		const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
		const order = new Order(input.cpf);
		for (const orderItem of input.orderItems) {
			const [itemData] = await connection.query("select * from ccca.item where id_item = $1", [orderItem.idItem]);
			const item = new Item(itemData.id_item, itemData.description, parseFloat(itemData.price), new Dimension(itemData.width, itemData.height, itemData.length, itemData.weight));
			order.addItem(item, orderItem.quantity);
		}
		const total = order.getTotal();
		return {
			total
		};
	}
}

type Input = {
	cpf: string,
	orderItems: { idItem: number, quantity: number }[]
}

type Output = {
	total: number
}