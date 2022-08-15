import "reflect-metadata";
import axios from "axios";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import StockEntryRepositoryDatabase from "../../src/infra/repository/StockEntryRepositoryDatabase";

test.skip("Deve calcular o frete", async function () {
	const connection = new PgPromiseAdapter();
	const stockEntryRepository = new StockEntryRepositoryDatabase(connection);
	await stockEntryRepository.clean();
	await axios({
		url: "http://localhost:3003/incrementStock",
		method: "post",
		data: [
			{
				idItem: 2,
				quantity: 10
			}
		]
	});
	await axios({
		url: "http://localhost:3003/decrementStock",
		method: "post",
		data: [
			{
				idItem: 2,
				quantity: 5
			}
		]
	});
	const response = await axios({
		url: "http://localhost:3003/getStock/2",
		method: "get"
	});
	const output = response.data;
	expect(output).toBe(5);
	await connection.close();
});
