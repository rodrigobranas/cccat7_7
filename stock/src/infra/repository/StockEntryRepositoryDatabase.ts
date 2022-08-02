import { inject, injectable } from "tsyringe";
import StockEntry from "../../domain/entity/StockEntry";
import StockEntryRepository from "../../domain/repository/StockEntryRepository";
import Connection from "../database/Connection";

@injectable()
export default class StockEntryRepositoryDatabase implements StockEntryRepository {

	constructor (@inject("Connection") readonly connection: Connection) {
	}

	async listByIdItem(idItem: number): Promise<StockEntry[]> {
		const stockEntriesData = await this.connection.query("select * from ccca_stock.stock_entry where id_item = $1", [idItem]);
		const stockEntries: StockEntry[] = [];
		for (const stockEntryData of stockEntriesData) {
			stockEntries.push(new StockEntry(stockEntryData.id_item, stockEntryData.operation, stockEntryData.quantity));
		}
		return stockEntries;
	}

	async save(stockEntry: StockEntry): Promise<void> {
		await this.connection.query("insert into ccca_stock.stock_entry (id_item, operation, quantity) values ($1, $2, $3)", [stockEntry.idItem, stockEntry.operation, stockEntry.quantity]);
	}

	async clean(): Promise<void> {
		await this.connection.query("delete from ccca_stock.stock_entry", []);
	}

}