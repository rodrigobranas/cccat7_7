export default class Item {

	constructor (readonly idItem: number, readonly description: string, readonly price: number, readonly width?: number, readonly height?: number, readonly length?: number, readonly weight?: number, readonly volume?: number, readonly density?: number) {
	}
}
