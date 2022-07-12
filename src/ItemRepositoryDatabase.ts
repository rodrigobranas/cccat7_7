import Item from "./Item";
import ItemRepository from "./ItemRepository";
import pgp from "pg-promise";
import Dimension from "./Dimension";

export default class ItemRepositoryDatabase implements ItemRepository {

	async getItem(idItem: number): Promise<Item> {
		const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
		const [itemData] = await connection.query("select * from ccca.item where id_item = $1", [idItem]);
		const item = new Item(itemData.id_item, itemData.description, parseFloat(itemData.price), new Dimension(itemData.width, itemData.height, itemData.length, itemData.weight));
		await connection.$pool.end();
		return item;
	}
}
