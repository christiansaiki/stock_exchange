/**
 * Health
 *
 * @export
 * @class Health
 */
export default class Health {
	constructor() {
		this.check = this.check.bind(this);
	}


	/**
	 * check - this method only answers with statusCode 200
	 * it's only purpose health check the system
	 *
	 * @returns {object}
	 * @memberof Health
	 */
	check(res) {
		return res.send(200);
	}
}
