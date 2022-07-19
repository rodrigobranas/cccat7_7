import OutputDevice from "./OutputDevice";

export default class StdoutAdapter implements OutputDevice {

	write(text: string): void {
		process.stdout.write(text);
	}

}