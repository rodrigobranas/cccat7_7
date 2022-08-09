import ExpressAdapter from "./infra/http/ExpressAdapter";
import ItemController from "./infra/controller/http/ItemController";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import GetItem from "./application/GetItem";
import ItemRepositoryDatabase from "./infra/repository/database/ItemRepositoryDatabase";

const http = new ExpressAdapter();
const connection = new PgPromiseAdapter();
const itemRepository = new ItemRepositoryDatabase(connection);
const getItem = new GetItem(itemRepository);
new ItemController(http, getItem);
http.listen(3004);