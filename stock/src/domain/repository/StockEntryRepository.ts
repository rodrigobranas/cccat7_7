import StockEntry from "../entity/StockEntry";

export default interface StockEntryRepository {
	listByIdItem (idItem: number): Promise<StockEntry[]>;
	save (stockEntry: StockEntry): Promise<void>;
	clean (): Promise<void>;
}
