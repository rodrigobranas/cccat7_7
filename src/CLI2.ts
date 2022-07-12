// Adaptador

import ItemRepositoryDatabase from "./ItemRepositoryDatabase";
import OrderService from "./OrderService";

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
		const itemRepository = new ItemRepositoryDatabase();
		const service = new OrderService(itemRepository);
		const output = await service.preview({ cpf, orderItems });
		console.log("total: ", output.total);
	}
});
