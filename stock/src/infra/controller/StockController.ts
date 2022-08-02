import { inject, injectable } from "tsyringe";
import DecrementStock from "../../application/DecrementStock";
import GetStock from "../../application/GetStock";
import IncrementStock from "../../application/IncrementStock";
import Http from "../http/Http";

@injectable()
export default class StockController {

	constructor (
		@inject("Http") readonly http: Http, 
		@inject("IncrementStock") readonly incrementStock: IncrementStock, 
		@inject("DecrementStock") readonly decrementStock: DecrementStock, 
		@inject("GetStock") readonly getStock: GetStock
	) {
		http.on("post", "/incrementStock", async function (params: any, body: any) {
			await incrementStock.execute(body);
		});
		
		http.on("post", "/decrementStock", async function (params: any, body: any) {
			await decrementStock.execute(body);
		});

		http.on("get", "/getStock/:idItem", async function (params: any, body: any) {
			const total = await getStock.execute(params.idItem);
			return total;
		});
	}
}
