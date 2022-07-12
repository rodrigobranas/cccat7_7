import Item from "./Item";

export default class FreightCalculator {
	static MIN_FREIGHT = 10;

	static calculate (item: Item) {
		const freight = item.getVolume() * 1000 * (item.getDensity()/100);
		if (freight === 0) return 0;
		return Math.max(freight, FreightCalculator.MIN_FREIGHT);
	}
}