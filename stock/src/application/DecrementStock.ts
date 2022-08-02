import { inject, injectable } from "tsyringe";
import StockCalculator from "../domain/entity/StockCalculator";
import StockEntry from "../domain/entity/StockEntry"
import StockEntryRepository from "../domain/repository/StockEntryRepository"

@injectable()
export default class DecrementStock {

	constructor (@inject("StockEntryRepository") readonly stockEntryRepository: StockEntryRepository) {
	}

	async execute (input: Input): Promise<void> {
		for (const stockEntryData of input) {
			const stockEntries = await this.stockEntryRepository.listByIdItem(stockEntryData.idItem);
			const total = StockCalculator.calculate(stockEntries);
			if (total < stockEntryData.quantity) throw new Error("Insufficient stock");
			await this.stockEntryRepository.save(new StockEntry(stockEntryData.idItem, "out", stockEntryData.quantity));
		}
	}
}

type Input = {
	idItem: number,
	quantity: number
}[]
