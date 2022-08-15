import CLIController from "../../src/infra/controller/cli/CLIController";
import CLIManager from "../../src/infra/cli/CLIManager";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import GetItemHttpGateway from "../../src/infra/gateway/GetItemHttpGateway";
import PreviewOrder from "../../src/application/PreviewOrder";
import GetItemGateway from "../../src/application/gateway/GetItemGateway";
import Item from "../../src/domain/entities/Item";

test("Deve testar o CLI", async function () {
	const inputDevice = { onData: () => {} };
	const outputDevice = { write: () => {} };
	const connection = new PgPromiseAdapter();
	const cliManager = new CLIManager(inputDevice, outputDevice);
	// const getItemGateway = new GetItemHttpGateway();
	const getItemGateway: GetItemGateway = {
		async execute (idItem: number): Promise<Item> {
			const items: any = {
				1: new Item(1, "Guitarra", 1000, 100, 30, 10, 3, 0.03, 100),
				2: new Item(2, "Amplificador", 5000, 50, 50, 50, 20, 1, 1),
				3: new Item(3, "Cabo", 30, 10, 10, 10, 1, 1, 1)
			};
			return items[idItem];
		}
	}
	const previewOrder = new PreviewOrder(getItemGateway);
	new CLIController(cliManager, previewOrder);
	await cliManager.execute("cpf 886.634.854-68");
	await cliManager.execute("add-item 1 1");
	const output = await cliManager.execute("preview");
	expect(output).toBe("total: 1000");
	await connection.close();
});
