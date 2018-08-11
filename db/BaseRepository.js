
/**
 * BaseRepository - this class has several methods that make the MongoDB calls much easier to handle
 *
 * @export
 * @class BaseRepository
 */
export default class BaseRepository {
	constructor(model) {
		this.model = model;
	}

	async create(info) {
		const entity = new this.model(info);
		return await this.resolve(entity.save());
	}

	async findAndUpdate(query, info, options = { new: true }) {
		return await this.resolve(this.model.findOneAndUpdate(query, info, options));
	}

	async remove(query) {
		return await this.resolve(this.model.remove(query));
	}

	async resolve(promise) {
		let result;
		let error;

		try {
			result = await promise;
		} catch(e) {
			error = e;
		}

		return { error, result };
	}
}
