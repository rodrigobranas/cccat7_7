import Item from "../domain/entities/Item";

export default class ItemDTO {

	constructor (
		readonly idItem: number,
		readonly description: string,
		readonly price: number,
		readonly width: number,
		readonly height: number,
		readonly length: number,
		readonly weight: number,
		readonly volume: number,
		readonly density: number
	) {
	}

	static fromEntity (item: Item) {
		return new ItemDTO(item.idItem, item.description, item.price, item.dimension.width, item.dimension.height, item.dimension.length, item.dimension.weight, item.getVolume(), item.getDensity());
	}
}
