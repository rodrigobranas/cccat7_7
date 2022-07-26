import Coordinate from "./Coordinate";

export default class DistanceCalculator {
	
	static calculate (from: Coordinate, to: Coordinate) {
		if (from.lat == to.lat && from.long == to.long) return 0;
		const radlat1 = (Math.PI * from.lat) / 180;
		const radlat2 = (Math.PI * to.lat) / 180;
		const theta = from.long - to.long;
		const radtheta = (Math.PI * theta) / 180;
		let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) dist = 1;
		dist = Math.acos(dist);
		dist = (dist * 180) / Math.PI;
		dist = dist * 60 * 1.1515;
		dist = dist * 1.609344; //convert miles to km
		return dist;
	}
}
