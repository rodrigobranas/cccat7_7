import axios from "axios";
import GetItemGateway from "../../application/gateway/GetItemGateway";
import Item from "../../domain/entities/Item";

export default class GetItemHttpGateway implements GetItemGateway {

	constructor () {
	}

	async execute(idItem: number): Promise<Item> {
		const response = await axios({
			url: `http://localhost:3004/items/${idItem}`,
			method: "get"
		});
		const itemData = response.data;
		return new Item(itemData.idItem, itemData.description, itemData.price, itemData.width, itemData.height, itemData.length, itemData.weight, itemData.volume, itemData.density);
	}
}
