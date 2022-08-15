import CheckoutHandler from "../../application/handler/CheckoutHandler";
import OrderProjectionHandler from "../../application/handler/OrderProjectionHandler";
import CheckoutCommand from "../../domain/command/CheckoutCommand";
import Queue from "./Queue";

export default class StockQueue {
	
	constructor (readonly queue: Queue, readonly checkoutHandler: CheckoutHandler, readonly orderProjectionHandler: OrderProjectionHandler) {
		queue.consume("checkout", async function (input: CheckoutCommand) {
			if (!input.input) return;
			input.input.date = new Date(input.input.date); 
			await checkoutHandler.execute(input.input);
			await orderProjectionHandler.execute(input.input);
		});
	}
}
