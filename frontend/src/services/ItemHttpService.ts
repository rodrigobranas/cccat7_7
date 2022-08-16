import Item from "../entities/Item";
import axios from "axios";
import ItemService from "./ItemService";
import HttpClient from "../infra/HttpClient";

export default class ItemHttpService implements ItemService {

	constructor (readonly httpClient: HttpClient, readonly baseUrl: string) {
	}

	async getItems (): Promise<Item[]> {
		const itemsData = await this.httpClient.get(`${this.baseUrl}/items`);
		const items = [];
		for (const itemData of itemsData) {
			const item = new Item(itemData.idItem, itemData.description, itemData.price, itemData.width, itemData.height, itemData.length, itemData.weight);
			items.push(item);
		}
		return items;
	}
}