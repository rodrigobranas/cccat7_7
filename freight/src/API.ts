// main

import FreightController from "./infra/controller/FreightController";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";


// Frameworks and Drivers
const http = new ExpressAdapter();
const connection = new PgPromiseAdapter();
// Interface Adapters
new FreightController(http, connection);
http.listen(3002);