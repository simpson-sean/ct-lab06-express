import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';


// CRUD
// C - create  POST   --> INSERT
// R - read    GET    --> SELECT
// U - update  PUT    --> UPDATE
// D - delete  DELETE --> DELETE

// STAPI = Star Trek API (STAPI)


describe('stapi routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates stapi object', async () => {
      const character = { name: 'Captian Kirk', species: 'Human', faction: 'Starfleet'};
      const res = await request(app).post('/api/v1/stapi').send(character);

      expect(res.body).toEqual({
        id: '1',
        ...character,
      })
  });


}); // <--- END PARENT CODE BLOCK

