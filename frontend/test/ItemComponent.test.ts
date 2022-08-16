import Item from "../src/entities/Item";
import Order from "../src/entities/Order";
import { mount } from "@vue/test-utils";
import ItemComponentVue from "../src/components/ItemComponent.vue";

test("Deve testar o componente de item", async function () {
	const order = new Order();
	const item = new Item(1, "Guitarra", 1000);
	order.addItem(item);
	order.addItem(item);
	order.addItem(new Item(2, "Amplificador", 5000));
	const wrapper = mount(ItemComponentVue, {
		props: {
			order,
			item
		}
	});
	expect(wrapper.get(".item-description").text()).toBe("Guitarra");
	expect(wrapper.get(".item-price").text()).toBe("1000");
	await wrapper.get(".add-button").trigger("click");
	expect(order.total).toBe(8000);
});
