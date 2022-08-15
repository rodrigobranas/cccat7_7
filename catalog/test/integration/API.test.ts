import axios from "axios";

test.skip("Deve obter um item da API", async function () {
	const response = await axios({
		url: "http://localhost:3004/items/1",
		method: "get"
	});
	const output = response.data;
	expect(output.description).toBe("Guitarra");
	expect(output.price).toBe(1000);
});
