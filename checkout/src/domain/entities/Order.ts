import Coupon from "./Coupon";
import Cpf from "./Cpf";
import Item from "./Item";
import OrderCode from "./OrderCode";
import OrderCoupon from "./OrderCoupon";
import OrderItem from "./OrderItem";

export default class Order {
	orderItems: OrderItem[];
	cpf: Cpf;
	coupon?: OrderCoupon;
	freight = 0;
	private code: OrderCode;
	guid?: string;

	constructor (cpf: string, readonly date: Date = new Date(), readonly sequence: number = 1) {
		this.cpf = new Cpf(cpf);
		this.orderItems = [];
		this.code = new OrderCode(date, sequence);
	}

	addItem (item: Item, quantity: number) {
		if (this.orderItems.some(orderItem => orderItem.idItem === item.idItem)) throw new Error("Duplicated item");
		this.orderItems.push(item.createOrderItem(quantity));
	}

	addCoupon (coupon: Coupon) {
		if (coupon.isExpired(this.date)) return;
		this.coupon = coupon.createOrderCoupon();
	}

	getCode () {
		return this.code.value;
	}

	getTotal () {
		let total = this.orderItems.reduce((total, orderItem) => {
			total += orderItem.getTotal();
			return total;
		}, 0);
		if (this.coupon) {
			total -= this.coupon.getDiscount(total);
		}
		if (this.freight) {
			total += this.freight;
		}
		return total;
	}
}
