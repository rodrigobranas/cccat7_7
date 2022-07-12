import Http from "./Http";
import ItemRepositoryDatabase from "./ItemRepositoryDatabase";
import OrderService from "./OrderService";

export default class OrderController {

	constructor (readonly http: Http) {
		http.on("post", "/orderPreview", function (params: any, body: any) {
			const itemRepository = new ItemRepositoryDatabase();
			// Application/Use Cases (Clean Architecture)
			const service = new OrderService(itemRepository);
			const output = service.preview(body);
			return output;
		});
	}
}
