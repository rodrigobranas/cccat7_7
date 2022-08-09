import Item from "../../domain/entities/Item";

export default interface GetItemGateway {
	execute (idItem: number): Promise<Item>;
}