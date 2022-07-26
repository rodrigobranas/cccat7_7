import axios from "axios";
import CalculateFreightGateway, { Input, Output} from "../../application/gateway/CalculateFreightGateway";

export default class CalculateFreightHttpGateway implements CalculateFreightGateway {

	constructor () {
	}

	async calculate(input: Input): Promise<Output> {
		const response = await axios({
			url: "http://localhost:3002/calculateFreight",
			method: "post",
			data: input
		});
		return response.data;
	}
}
