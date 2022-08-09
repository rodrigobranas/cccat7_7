import CheckoutHandler from "../../application/handler/CheckoutHandler";
import CheckoutCommand from "../../domain/event/CheckoutCommand";
import Queue from "./Queue";

export default class StockQueue {
	
	constructor (readonly queue: Queue, readonly checkoutHandler: CheckoutHandler) {
		queue.consume("checkout", async function (input: CheckoutCommand) {
			// console.log(input);
			input.input.date = new Date(input.input.date); 
			await checkoutHandler.execute(input.input);
		});
	}
}