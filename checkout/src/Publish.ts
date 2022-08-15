import amqp from "amqplib";
import CheckoutCommand from "./domain/command/CheckoutCommand";

async function init () {
	const connection = await amqp.connect("amqp://localhost");
	const channel = await connection.createChannel();
	await channel.assertQueue("checkout", { durable: true });
	const guid = (Math.random() + 1).toString(36).substring(7);
	const input = new CheckoutCommand({
			guid,
			from: "22060030",
			to: "88015600",
			cpf: "886.634.854-68",
			orderItems: [
				{ idItem: 1, quantity: 1 },
				{ idItem: 2, quantity: 1 },
				{ idItem: 3, quantity: 3 }
			],
			date: new Date("2022-03-01T10:00:00")
	});
	channel.sendToQueue("checkout", Buffer.from(JSON.stringify(input)));
	// await connection.close();
}

init();