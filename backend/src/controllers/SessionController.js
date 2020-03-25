const database = require('./../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const ong = await database('ongs')
            .where('id', id)
            .select('name')
            .first();

        if (! ong) {
            return response.status(400).json({
                'error': 'No Incident found with this ID.'
            });
        }

        response.json(ong);
    }
}