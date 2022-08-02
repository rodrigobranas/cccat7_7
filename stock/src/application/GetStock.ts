import { inject, injectable } from "tsyringe";
import StockCalculator from "../domain/entity/StockCalculator";
import StockEntry from "../domain/entity/StockEntry"
import StockEntryRepository from "../domain/repository/StockEntryRepository"

@injectable()
export default class GetStock {

	constructor (@inject("StockEntryRepository") readonly stockEntryRepository: StockEntryRepository) {
	}

	async execute (idItem: number): Promise<number> {
		const stockEntries = await this.stockEntryRepository.listByIdItem(idItem);
		const total = StockCalculator.calculate(stockEntries);
		return total;
	}
}
