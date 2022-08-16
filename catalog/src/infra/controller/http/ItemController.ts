import GetItem from "../../../application/GetItem";
import GetItems from "../../../application/GetItems";
import Http from "../../http/Http";

export default class ItemController {

	constructor (readonly http: Http, readonly getItem: GetItem, readonly getItems: GetItems) {
		http.on("get", "/items/:idItem", async function (params: any, body: any) {
			const output = await getItem.execute(params.idItem);
			return output;
		});

		http.on("get", "/items", async function (params: any, body: any) {
			const output = await getItems.execute();
			return output;
		});
	}
}
