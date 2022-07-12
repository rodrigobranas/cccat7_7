import Item from "./Item";

export default interface ItemRepository {
	getItem (idItem: number): Promise<Item>;
}
