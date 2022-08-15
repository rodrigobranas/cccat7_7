import DomainEvent from "../event/DomainEvent";

export default class CheckoutCommand implements DomainEvent {
	name = "checkout";

	constructor (readonly input: any) {
	}
}