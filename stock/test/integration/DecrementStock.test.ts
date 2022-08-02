import "reflect-metadata";
import DecrementStock from "../../src/application/DecrementStock";
import GetStock from "../../src/application/GetStock";
import IncrementStock from "../../src/application/IncrementStock";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import StockEntryRepositoryDatabase from "../../src/infra/repository/StockEntryRepositoryDatabase";

test("Deve decrementar o estoque", async function () {
	const connection = new PgPromiseAdapter();
	const stockEntryRepository = new StockEntryRepositoryDatabase(connection);
	await stockEntryRepository.clean();
	const incrementStock = new IncrementStock(stockEntryRepository);
	incrementStock.execute([ { idItem: 1, quantity: 10 } ]);
	const decrementStock = new DecrementStock(stockEntryRepository);
	await decrementStock.execute([ { idItem: 1, quantity: 5 } ]);
	const getStock = new GetStock(stockEntryRepository);
	const output = await getStock.execute(1);
	expect(output).toBe(5);
	await connection.close();
});

test("Não pode decrementar se não houver estoque", async function () {
	const connection = new PgPromiseAdapter();
	const stockEntryRepository = new StockEntryRepositoryDatabase(connection);
	await stockEntryRepository.clean();
	const incrementStock = new IncrementStock(stockEntryRepository);
	incrementStock.execute([ { idItem: 1, quantity: 5 } ]);
	const decrementStock = new DecrementStock(stockEntryRepository);
	await expect(() => decrementStock.execute([ { idItem: 1, quantity: 10 } ])).rejects.toThrow(new Error("Insufficient stock"));
	await connection.close();
});
