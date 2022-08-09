import "reflect-metadata";
import { container } from "tsyringe";
import DecrementStock from "./application/DecrementStock";
import GetStock from "./application/GetStock";
import IncrementStock from "./application/IncrementStock";
import StockController from "./infra/controller/StockController";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import RabbitMQAdapter from "./infra/queue/RabbitMQAdapter";
import StockQueue from "./infra/queue/StockQueue";
import StockEntryRepositoryDatabase from "./infra/repository/StockEntryRepositoryDatabase";

async function init () {
	const http = new ExpressAdapter();
	const connection = new PgPromiseAdapter();
	container.register("Http", { useValue: http });
	container.register("Connection", { useValue: connection });
	container.register("StockEntryRepository", StockEntryRepositoryDatabase);
	container.register("DecrementStock", DecrementStock);
	container.register("IncrementStock", IncrementStock);
	container.register("GetStock", GetStock);
	container.resolve(StockController);
	const stockEntryRepository = new StockEntryRepositoryDatabase(connection);
	const decrementStock = new DecrementStock(stockEntryRepository);
	const queue = new RabbitMQAdapter();
	await queue.connect();
	new StockQueue(queue, decrementStock);
	http.listen(3003);
}

init();
