import CalculateFreight from "../../application/CalculateFreight";
import Connection from "../database/Connection";
import Http from "../http/Http";
import CityRepositoryDatabase from "../repository/CityRepositoryDatabase";

// Interface Adapter
export default class FreightController {

	constructor (readonly http: Http, readonly connection: Connection) {
		http.on("post", "/calculateFreight", function (params: any, body: any) {
			const cityRepository = new CityRepositoryDatabase(connection);
			const calculateFreight = new CalculateFreight(cityRepository);
			const output = calculateFreight.execute(body);
			return output;
		});
	}
}
