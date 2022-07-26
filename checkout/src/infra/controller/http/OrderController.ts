import Connection from "../../database/Connection";
import Http from "../../http/Http";
import ItemRepositoryDatabase from "../../repository/database/ItemRepositoryDatabase";
import PreviewOrder from "../../../application/PreviewOrder";
// Interface Adapter
export default class OrderController {

	constructor (readonly http: Http, readonly connection: Connection) {
		http.on("post", "/orderPreview", function (params: any, body: any) {
			const itemRepository = new ItemRepositoryDatabase(connection);
			const previewOrder = new PreviewOrder(itemRepository);
			const output = previewOrder.execute(body);
			return output;
		});
	}
}
