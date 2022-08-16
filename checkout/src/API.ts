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
import Checkout from "./application/Checkout";
import CheckoutQueue from "./infra/queue/CheckoutQueue";
import OrderQuery from "./infra/query/OrderQuery";
import OrderProjectionHandler from "./application/handler/OrderProjectionHandler";

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
	const connection = new PgPromiseAdapter();
	const orderRepository = new OrderRepositoryDatabase(connection)
	const checkoutHandler = new CheckoutHandler(orderRepository, new CalculateFreightHttpGateway(), decrementStockGateway, getItemGateway, queue);
	const checkout = new Checkout(queue);
	const orderQuery = new OrderQuery(connection);
	const orderProjectionHandler = new OrderProjectionHandler(orderQuery, getItemGateway);
	new OrderController(http, previewOrder, checkout);
	new CheckoutQueue(queue, checkoutHandler, orderProjectionHandler);
	http.listen(3000);
}

init();
