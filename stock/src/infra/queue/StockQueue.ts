import DecrementStock from "../../application/DecrementStock";
import OrderPlaced from "../../domain/event/OrderPlaced";
import Queue from "./Queue";

export default class StockQueue {
	
	constructor (readonly queue: Queue, readonly decrementStock: DecrementStock) {
		queue.consume("orderPlaced", async function (input: OrderPlaced) {
			await decrementStock.execute(input.orderItems);
		});
	}
}