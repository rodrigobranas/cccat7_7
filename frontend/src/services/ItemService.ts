import Item from "../entities/Item";

export default interface ItemService {
	getItems (): Promise<Item[]>;
}
