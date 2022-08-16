import Item from "../../../domain/entities/Item";
import ItemRepository from "../../../domain/repository/ItemRepository";
import Dimension from "../../../domain/entities/Dimension";
import Connection from "../../database/Connection";
// Interface Adapter
export default class ItemRepositoryDatabase implements ItemRepository {
	// DIP - Dependency Inversion Principle
	constructor (readonly connection: Connection) {
	}

	async getItem(idItem: number): Promise<Item> {
		const [itemData] = await this.connection.query("select * from ccca_catalog.item where id_item = $1", [idItem]);
		const item = new Item(itemData.id_item, itemData.description, parseFloat(itemData.price), new Dimension(itemData.width, itemData.height, itemData.length, itemData.weight));
		return item;
	}

	async list(): Promise<Item[]> {
		const itemsData = await this.connection.query("select * from ccca_catalog.item", []);
		const items: Item[] = [];
		for (const itemData of itemsData) {
			const item = new Item(itemData.id_item, itemData.description, parseFloat(itemData.price), new Dimension(itemData.width, itemData.height, itemData.length, itemData.weight));
			items.push(item);
		}
		return items;
	}
}
