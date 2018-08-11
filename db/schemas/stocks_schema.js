export function stocks (Schema) {
	return new Schema({
		company_id: String,
		countries: [String],
		budget: Number,
		base_bid: Number,
		categories: [String],
	},
	{
		timestamps: {
			updatedAt: 'updated_at',
			createdAt: 'created_at'
		}
	});
}
