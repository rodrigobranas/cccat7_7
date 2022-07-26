import City from "../../domain/entity/City";
import CityRepository from "../../domain/repository/CityRepository";
import Connection from "../database/Connection";

export default class CityRepositoryDatabase implements CityRepository {

	constructor (readonly connection: Connection) {
	}

	async getByZipcode(code: string): Promise<City> {
		const [cityData] = await this.connection.query("select id_city, name, lat, long from ccca_freight.zipcode join ccca_freight.city using (id_city) where code = $1", [code]);
		if (!cityData) throw new Error("City not found");
		return new City(cityData.id_city, cityData.name, parseFloat(cityData.lat), parseFloat(cityData.long));
	}
}
