import { createApp } from "vue";
import App from "./App.vue";
import AxiosAdapter from "./infra/AxiosAdapter";
import ItemHttpService from "./services/ItemHttpService";
import { createRouter, createWebHistory } from "vue-router";
import CheckoutViewVue from "./views/CheckoutView.vue";

const app = createApp(App);
const httpClient = new AxiosAdapter();
// const httpClient = new FetchAdapter();
const baseUrl = "http://localhost:3004";
// const itemService: ItemService = {
// 	async getItems(): Promise<Item[]> {
// 		return [
// 			{ idItem: 1, description: "Baixo", price: 2000 }
// 		];
// 	}
// }
const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: "/checkout", component: CheckoutViewVue }
	]
});
app.use(router);
const itemService = new ItemHttpService(httpClient, baseUrl);
app.provide("itemService", itemService);
app.mount("#app");
