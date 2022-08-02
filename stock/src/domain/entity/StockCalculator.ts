import StockEntry from "./StockEntry";

export default class StockCalculator {

	static calculate (stockEntries: StockEntry[]) {
		return stockEntries.reduce((total, stockEntry) => {
			if (stockEntry.operation === "in") {
				total += stockEntry.quantity;
			}
			if (stockEntry.operation === "out") {
				total -= stockEntry.quantity;
			}
			return total;
		}, 0);
	}
}