import ItemRepository from "../domain/repository/ItemRepository"
import ItemDTO from "./ItemDTO";

export default class GetItem {

	constructor (readonly itemRepository: ItemRepository) {
	}

	async execute (idItem: number): Promise<ItemDTO> {
		const item = await this.itemRepository.getItem(idItem);
		return ItemDTO.fromEntity(item);
	}
}
