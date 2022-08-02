export default interface DecrementStockGateway {
	decrement(input: Input): Promise<void>;
}

export type Input = {
	idItem: number,
	quantity: number
}[]