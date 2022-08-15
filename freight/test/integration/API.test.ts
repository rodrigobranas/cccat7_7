import axios from "axios";

test.skip("Deve calcular o frete", async function () {
	const response = await axios({
		url: "http://localhost:3002/calculateFreight",
		method: "post",
		data: {
			from: "22060030",
			to: "88015600",
			orderItems: [
				{ 
					volume: 0.03,
					density: 100,
					quantity: 1
				}
			]
		}
	});
	const output = response.data;
	expect(output.total).toBe(22.45);
});
