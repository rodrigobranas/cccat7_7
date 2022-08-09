import DomainEvent from "../../domain/event/DomainEvent";
import Queue from "./Queue";
import amqp from "amqplib";

export default class RabbitMQAdapter implements Queue {
	connection: any;

	constructor () {
	}

	async connect(): Promise<void> {
		this.connection = await amqp.connect("amqp://localhost");
	}

	async close(): Promise<void> {
		await this.connection.close();
	}

	async consume(eventName: string, callback: Function): Promise<void> {
		const channel = await this.connection.createChannel();
		await channel.assertQueue(eventName, { durable: true });
		await channel.consume(eventName, async function (msg: any) {
			if (msg) {
				const input = JSON.parse(msg.content.toString());
				await callback(input);
				channel.ack(msg);
			}
		});
	}

	async publish(domainEvent: DomainEvent): Promise<void> {
		const channel = await this.connection.createChannel();
		await channel.assertQueue(domainEvent.name, { durable: true });
		channel.sendToQueue(domainEvent.name, Buffer.from(JSON.stringify(domainEvent)));
	}

}
