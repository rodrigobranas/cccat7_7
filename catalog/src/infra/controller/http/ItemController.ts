import GetItem from "../../../application/GetItem";
import Http from "../../http/Http";

export default class ItemController {

	constructor (readonly http: Http, readonly getItem: GetItem) {
		http.on("get", "/items/:idItem", async function (params: any, body: any) {
			const output = await getItem.execute(params.idItem);
			return output;
		});
	}
}
