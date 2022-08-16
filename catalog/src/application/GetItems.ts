import ItemRepository from "../domain/repository/ItemRepository"
import ItemDTO from "./ItemDTO";

export default class GetItems {

	constructor (readonly itemRepository: ItemRepository) {
	}

	async execute (): Promise<ItemDTO[]> {
		const items = await this.itemRepository.list();
		const itemsDTO: ItemDTO[] = [];
		for (const item of items) {
			itemsDTO.push(ItemDTO.fromEntity(item));
		}
		return itemsDTO;
	}
}
