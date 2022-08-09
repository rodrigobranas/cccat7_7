import ExpressAdapter from "./infra/http/ExpressAdapter";
import OrderController from "./infra/controller/http/OrderController";
import GetItemHttpGateway from "./infra/gateway/GetItemHttpGateway";
import PreviewOrder from "./application/PreviewOrder";
import CheckoutHandler from "./application/handler/CheckoutHandler";
import OrderRepositoryDatabase from "./infra/repository/database/OrderRepositoryDatabase";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import CalculateFreightHttpGateway from "./infra/gateway/CalculateFreightHttpGateway";
import RabbitMQAdapter from "./infra/queue/RabbitMQAdapter";
import * as DecrementStockGateway from "./application/gateway/DecrementStockGateway";
import Checkout2 from "./application/Checkout2";
import CheckoutQueue from "./infra/queue/CheckoutQueue";

async function init () {
	const http = new ExpressAdapter();
	const getItemGateway = new GetItemHttpGateway();
	const previewOrder = new PreviewOrder(getItemGateway);
	const queue = new RabbitMQAdapter();
	await queue.connect();
	const decrementStockGateway: DecrementStockGateway.default = {
		async decrement (input: DecrementStockGateway.Input): Promise<void> {
		}
	};
	const checkoutHandler = new CheckoutHandler(new OrderRepositoryDatabase(new PgPromiseAdapter()), new CalculateFreightHttpGateway(), decrementStockGateway, new GetItemHttpGateway(), queue);
	const checkout = new Checkout2(queue);
	new OrderController(http, previewOrder, checkout);
	new CheckoutQueue(queue, checkoutHandler)
	http.listen(3000);
}

init();
