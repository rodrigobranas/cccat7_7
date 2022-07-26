import City from "../entity/City";

export default interface CityRepository {
	getByZipcode (code: string): Promise<City>;
}
