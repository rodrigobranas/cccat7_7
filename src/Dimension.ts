export default class Dimension {

	constructor (readonly width: number = 0, readonly height: number = 0, readonly length: number = 0, readonly weight: number = 0) {
		if (width < 0 || height < 0 || length < 0 || weight < 0) throw new Error("Invalid dimension");
	}

	getVolume () {
		return this.width/100 * this.height/100 * this.length/100;
	}

	getDensity () {
		if (this.getVolume() === 0) return 0;
		return this.weight/this.getVolume();
	}
}