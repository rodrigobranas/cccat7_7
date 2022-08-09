import DomainEvent from "./DomainEvent";

export default class OrderPlaced implements DomainEvent {
	name = "orderPlaced";

	constructor (readonly code: string, readonly orderItems: { idItem: number, quantity: number }[]) {
	}
}
