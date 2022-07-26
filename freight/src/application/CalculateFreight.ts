import DistanceCalculator from "../domain/entity/DistanceCalculator";
import FreightCalculator from "../domain/entity/FreightCalculator";
import CityRepository from "../domain/repository/CityRepository"

export default class CalculateFreight {

	constructor (readonly cityRepository: CityRepository) {
	}

	async execute (input: Input): Promise<Output> {
		const from = await this.cityRepository.getByZipcode(input.from);
		const to = await this.cityRepository.getByZipcode(input.to);
		const distance = DistanceCalculator.calculate(from.coordinate, to.coordinate);
		let total = 0;
		for (const orderItem of input.orderItems) {
			total += FreightCalculator.calculate(distance, orderItem.volume, orderItem.density) * orderItem.quantity;
		}
		total = Math.round(total*100)/100;
		return {
			total
		}
	}
}

type Input = {
	from: string,
	to: string,
	orderItems: {
		volume: number,
		density: number,
		quantity: number
	}[]
}

type Output = {
	total: number
}
