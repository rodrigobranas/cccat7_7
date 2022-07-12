// Adaptador

import ExpressAdapter from "./ExpressAdapter";
import OrderController from "./OrderController";

// Framework and Driver (Clean Architecture)
const http = new ExpressAdapter();
// Inteface Adapter (Clean Architecture)
const router = new OrderController(http);
http.listen(3000);
