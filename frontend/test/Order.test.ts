import Item from "../src/entities/Item";
import Order from "../src/entities/Order";

test("Deve criar um pedido", function () {
	const order = new Order();
	order.addItem(new Item(1, "Guitarra", 1000));
	order.addItem(new Item(1, "Guitarra", 1000));
	order.addItem(new Item(2, "Amplificador", 5000));
	expect(order.total).toBe(7000);	
});

test("Deve deletar um item do pedido", function () {
	const order = new Order();
	order.addItem(new Item(1, "Guitarra", 1000));
	order.addItem(new Item(1, "Guitarra", 1000));
	order.addItem(new Item(2, "Amplificador", 5000));
	order.removeOrderItem(1);
	expect(order.total).toBe(6000);	
});