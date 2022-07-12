export default interface Http {
	on (method: string, url: string, callback: Function): void;
	listen(port: number): void;
}
