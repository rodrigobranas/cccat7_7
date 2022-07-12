export default class Coupon {

	constructor (readonly code: string, readonly percentage: number, readonly expireDate: Date) {
	}

	isExpired (date: Date) {
		return this.expireDate.getTime() < date.getTime();
	}

	getDiscount (total: number) {
		return (total * this.percentage)/100;
	}
}
