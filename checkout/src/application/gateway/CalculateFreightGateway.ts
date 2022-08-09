export default interface CalculateFreightGateway {
	calculate(input: Input): Promise<Output>;
}

export type Input = {
	from: string,
	to: string,
	orderItems: {
		volume?: number,
		density?: number,
		quantity: number
	}[]
}

export type Output = {
	total: number
}
