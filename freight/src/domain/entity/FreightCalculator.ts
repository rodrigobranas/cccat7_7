export default class FreightCalculator {
	static MIN_FREIGHT = 10;

	static calculate (distance: number, volume: number, density: number) {
		const freight = volume * distance * (density/100);
		if (freight === 0) return 0;
		return Math.max(freight, FreightCalculator.MIN_FREIGHT);
	}
}
