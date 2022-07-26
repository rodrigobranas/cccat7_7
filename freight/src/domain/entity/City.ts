import Coordinate from "./Coordinate";

export default class City {
	coordinate: Coordinate;

	constructor (readonly idCity: number, readonly name: string, readonly lat: number, readonly long: number) {
		this.coordinate = new Coordinate(lat, long);
	}
}
