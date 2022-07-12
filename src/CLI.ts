import pgp from "pg-promise";
import Dimension from "./Dimension";
import Item from "./Item";
import Order from "./Order";

const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
let cpf: string = "";
let orderItems: { idItem: number, quantity: number }[] = [];

process.stdin.on("data", async function (chunk) {
	const command = chunk.toString();

	if (command.startsWith("cpf")) {
		cpf = command.replace("cpf ", "");
	}
	if (command.startsWith("add-item")) {
		const [idItem, quantity] = command.replace("add-item ", "").split(" ");
		orderItems.push({ idItem: parseInt(idItem), quantity: parseInt(quantity) });
	}
	if (command.startsWith("preview")) {
		const order = new Order(cpf);
		for (const orderItem of orderItems) {
			const [itemData] = await connection.query("select * from ccca.item where id_item = $1", [orderItem.idItem]);
			const item = new Item(itemData.id_item, itemData.description, parseFloat(itemData.price), new Dimension(itemData.width, itemData.height, itemData.length, itemData.weight));
			order.addItem(item, orderItem.quantity);
		}
		console.log("total: ", order.getTotal());
	}
});
