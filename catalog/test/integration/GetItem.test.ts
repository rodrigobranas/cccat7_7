import GetItem from "../../src/application/GetItem";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import ItemRepositoryDatabase from "../../src/infra/repository/database/ItemRepositoryDatabase";

test("Deve obter um item", async function () {
	const connection = new PgPromiseAdapter();
	const itemRepository = new ItemRepositoryDatabase(connection);
	const getItem = new GetItem(itemRepository);
	const item = await getItem.execute(1);
	expect(item.description).toBe("Guitarra");
	expect(item.price).toBe(1000);
	expect(item.volume).toBe(0.03);
	expect(item.density).toBe(100);
	await connection.close();
});