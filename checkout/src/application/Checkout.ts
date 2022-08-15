import CheckoutCommand from "../domain/command/CheckoutCommand";
import Queue from "../infra/queue/Queue";

export default class Checkout {

	constructor (
		readonly queue: Queue
	) {
	}

	async execute (input: Input): Promise<void> {
		await this.queue.publish(new CheckoutCommand(input));
	}
}

type Input = {
	guid?: string,
	from: string,
	to: string,
	cpf: string,
	date: Date,
	orderItems: { idItem: number, quantity: number }[]
}
