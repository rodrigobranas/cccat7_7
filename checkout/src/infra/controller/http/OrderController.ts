import Http from "../../http/Http";
import PreviewOrder from "../../../application/PreviewOrder";
import Checkout2 from "../../../application/Checkout2";

export default class OrderController {

	constructor (readonly http: Http, readonly previewOrder: PreviewOrder, readonly checkout: Checkout2) {
		http.on("post", "/orderPreview", function (params: any, body: any) {
			const output = previewOrder.execute(body);
			return output;
		});

		http.on("post", "/checkout", function (params: any, body: any) {
			const output = checkout.execute(body);
			return output;
		});
	}
}
