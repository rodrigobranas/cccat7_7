import Item from "../entities/Item";

export default interface ItemRepository {
	getItem (idItem: number): Promise<Item>;
	list (): Promise<Item[]>;
}
