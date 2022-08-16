import Item from "../src/entities/Item";
import Order from "../src/entities/Order";
import { mount } from "@vue/test-utils";
import OrderComponentVue from "../src/components/OrderComponent.vue";

test("Deve testar o componente de pedido", async function () {
	const order = new Order();
	order.addItem(new Item(1, "Guitarra", 1000));
	order.addItem(new Item(1, "Guitarra", 1000));
	order.addItem(new Item(2, "Amplificador", 5000));
	const wrapper = mount(OrderComponentVue, {
		props: {
			order
		}
	});
	expect(wrapper.get(".total").text()).toBe("7000");
	await wrapper.get(".delete-order-item").trigger("click");
	await wrapper.vm.$forceUpdate();
	expect(wrapper.get(".total").text()).toBe("6000");
});
