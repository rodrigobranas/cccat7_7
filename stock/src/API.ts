import "reflect-metadata";
import { container } from "tsyringe";
import DecrementStock from "./application/DecrementStock";
import GetStock from "./application/GetStock";
import IncrementStock from "./application/IncrementStock";
import StockController from "./infra/controller/StockController";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import StockEntryRepositoryDatabase from "./infra/repository/StockEntryRepositoryDatabase";

const http = new ExpressAdapter();
container.register("Http", { useValue: http });
container.register("Connection", { useValue: new PgPromiseAdapter() });
container.register("StockEntryRepository", StockEntryRepositoryDatabase);
container.register("DecrementStock", DecrementStock);
container.register("IncrementStock", IncrementStock);
container.register("GetStock", GetStock);
container.resolve(StockController);

http.listen(3003);