import Item from "../src/entities/Item";
import Order from "../src/entities/Order";
import { mount } from "@vue/test-utils";
import CheckoutViewVue from "../src/views/CheckoutView.vue";
import ItemService from "../src/services/ItemService";
import ItemHttpService from "../src/services/ItemHttpService";
import AxiosAdapter from "../src/infra/AxiosAdapter";

function sleep (ms: number) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(true);
		}, ms);
	})
}

test("Deve testar a view checkout", async function () {
	// const httpClient = new AxiosAdapter();
	// const baseUrl = "http://localhost:3004";
	// const itemService = new ItemHttpService(httpClient, baseUrl);
	const itemService: ItemService = {
		async getItems(): Promise<Item[]> {
			return [
				{ idItem: 1, description: "Baixo", price: 2000 }
			];
		}
	}
	const wrapper = mount(CheckoutViewVue, {
		global: {
			provide: {
				itemService
			}
		}
	});
	await sleep(100);
	expect(wrapper.get(".item-description").text()).toBe("Baixo");
	expect(wrapper.get(".item-price").text()).toBe("2000");
	await wrapper.get(".add-button").trigger("click");
	await wrapper.vm.$forceUpdate();
	expect(wrapper.get(".total").text()).toBe("2000");
});
