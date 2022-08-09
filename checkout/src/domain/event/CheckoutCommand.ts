import DomainEvent from "./DomainEvent";

export default class CheckoutCommand implements DomainEvent {
	name = "checkout";

	constructor (readonly input: any) {
	}
}