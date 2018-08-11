export function stocks (Schema) {
	return new Schema({
		companyId: String,
		countries: [String],
		budget: Number,
		baseBid: Number,
		categories: [String],
	},
	{
		timestamps: {
			updatedAt: 'updated_at',
			createdAt: 'created_at'
		}
	});
}
