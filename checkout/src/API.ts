// main
import ExpressAdapter from "./infra/http/ExpressAdapter";
import OrderController from "./infra/controller/http/OrderController";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";

// Frameworks and Drivers
const http = new ExpressAdapter();
const connection = new PgPromiseAdapter();
// Interface Adapters
new OrderController(http, connection);
http.listen(3000);