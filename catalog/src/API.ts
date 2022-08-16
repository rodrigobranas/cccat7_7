import ExpressAdapter from "./infra/http/ExpressAdapter";
import ItemController from "./infra/controller/http/ItemController";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import GetItem from "./application/GetItem";
import ItemRepositoryDatabase from "./infra/repository/database/ItemRepositoryDatabase";
import GetItems from "./application/GetItems";

const http = new ExpressAdapter();
const connection = new PgPromiseAdapter();
const itemRepository = new ItemRepositoryDatabase(connection);
const getItem = new GetItem(itemRepository);
const getItems = new GetItems(itemRepository);
new ItemController(http, getItem, getItems);
http.listen(3004);