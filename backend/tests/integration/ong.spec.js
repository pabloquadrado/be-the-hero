const request = require('supertest');
const app = require('../../src/app');
const database = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await database.migrate.rollback();
        await database.migrate.latest();
    });

    afterAll(async () => {
        await database.destroy();
    });

   it('should be able to create a new ONG', async () => {
      const response = await request(app)
          .post('/ongs')
          .send({
             name: "APAE Não",
             email: "contato@apae.com",
             whatsapp: "51999009633",
             city: "Guaíba",
             uf: "RS"
          });

      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toHaveLength(8);
   })
});
