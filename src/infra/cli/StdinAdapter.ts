import InputDevice from "./InputDevice";

export default class StdinAdapter implements InputDevice {
	
	onData(callback: Function): void {
		process.stdin.on("data", function (chunk) {
			const text = chunk.toString();
			callback(text);
		});
	}

}