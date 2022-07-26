export default class OrderCoupon {
	constructor (readonly code: string, readonly percentage: number) {
	}

	getDiscount (total: number) {
		return (total * this.percentage)/100;
	}
}
