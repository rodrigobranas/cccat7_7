import Coupon from "../../src/domain/entities/Coupon"

test("Deve criar um cupom de desconto", function () {
	const coupon = new Coupon("VALE20", 20, new Date("2023-03-01T10:00:00"));
	const discount = coupon.getDiscount(1000);
	expect(discount).toBe(200);
});

test("Deve criar um cupom de desconto expirado", function () {
	const coupon = new Coupon("VALE20", 20, new Date("2022-03-01T10:00:00"));
	const isExpired = coupon.isExpired(new Date("2022-03-10T10:00:00"));
	expect(isExpired).toBe(true);
});
