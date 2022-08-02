import { inject, injectable } from "tsyringe";
import StockEntry from "../domain/entity/StockEntry"
import StockEntryRepository from "../domain/repository/StockEntryRepository"

@injectable()
export default class IncrementStock {

	constructor (@inject("StockEntryRepository") readonly stockEntryRepository: StockEntryRepository) {
	}

	async execute (input: Input): Promise<void> {
		for (const stockEntryData of input) {
			await this.stockEntryRepository.save(new StockEntry(stockEntryData.idItem, "in", stockEntryData.quantity));
		}
	}
}

type Input = {
	idItem: number,
	quantity: number
}[]
