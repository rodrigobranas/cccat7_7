//main
import CLIController from "./infra/controller/cli/CLIController";
import CLIManager from "./infra/cli/CLIManager";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import StdinAdapter from "./infra/cli/StdinAdapter";
import StdoutAdapter from "./infra/cli/StdoutAdapter";
import GetItemHttpGateway from "./infra/gateway/GetItemHttpGateway";
import PreviewOrder from "./application/PreviewOrder";

// Frameworks and Drivers
const inputDevice = new StdinAdapter();
const outputDevice = new StdoutAdapter();
const connection = new PgPromiseAdapter();
// Interface Adapters
const cliManager = new CLIManager(inputDevice, outputDevice);
const getItemGateway = new GetItemHttpGateway();
const previewOrder = new PreviewOrder(getItemGateway);
new CLIController(cliManager, previewOrder);
